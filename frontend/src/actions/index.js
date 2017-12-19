export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED'
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING'
export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
export const ORDER_BY_VOTESCORE = 'ORDER_BY_VOTESCORE'
export const ORDER_BY_DATE = 'ORDER_BY_DATE'
export const FILTER_POSTS = 'FILTER_POSTS'
export const SET_ACTIVE_POST = 'SET_ACTIVE_POST'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SINGLE_POST_FETCH_DATA_SUCCESS = 'SINGLE_POST_FETCH_DATA_SUCCESS'
export const DELETE_POST = 'DELETE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_MAIN_POST_SCORE = 'UPDATE_MAIN_POST_SCORE'


export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function categoriesFetchDataSuccess(items) {
    return {
        type: 'CATEGORIES_FETCH_DATA_SUCCESS',
        items
    };
}
export function postsFetchDataSuccess(items) {
    return {
        type: 'POSTS_FETCH_DATA_SUCCESS',
        items
    };
}

export function singlePostFetchDataSuccess(item) {
    return {
        type: 'SINGLE_POST_FETCH_DATA_SUCCESS',
        item
    };
}

export function orderByVoteScore(direction) {
  return {
    type: 'ORDER_BY_VOTESCORE',
    direction
  };
}

export function orderByDate(direction) {
  return {
    type: 'ORDER_BY_DATE',
    direction
  };
}

export function filterPosts(category) {
  return {
    type: 'FILTER_POSTS',
    category
  };
}

export function commentsFetchDataSuccess(items) {
  return {
    type: 'COMMENTS_FETCH_DATA_SUCCESS',
    items
  }
}

export function updatePostScore(direction, id) {
  return {
    type: 'UPDATE_POST_SCORE',
    direction,
    id
  }
}

export function updateMainPostScore(direction, id) {
    return {
      type: 'UPDATE_MAIN_POST_SCORE',
      direction,
      id
    }
  }

export function updateCommentScore(direction, id) {
    return {
      type: 'UPDATE_COMMENT_SCORE',
      direction,
      id
    }
  }

export function addComment(comment) {
    return {
      type: 'ADD_COMMENT',
      comment
    }
}

export function addPost(post) {
    return {
      type: 'ADD_POST',
      post
    }
}

export function updateComment(commentId, body) {
    return {
      type: 'UPDATE_COMMENT',
      commentId,
      body
    }
}

export function deleteComment(commentId) {
    return {
      type: 'DELETE_COMMENT',
      commentId
    }
}

export function deletePost(commentId) {
    return {
      type: 'DELETE_POST',
      commentId
    }
}

export function updatePost(id, title, body) {
    return {
      type: 'UPDATE_POST',
      id,
      title,
      body
    }
}

/* thunk functions */
const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'letmein',
  'Content-Type': 'application/json'
}

export function itemsFetchCategories() {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(`${api}/categories`, { headers })
            .then((response) => {
                if (!response.ok) {
                  throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then(data => data.categories)
            .then((items) => dispatch(categoriesFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsFetchPosts() {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(`${api}/posts`, { headers })
            .then((response) => {
                if (!response.ok) {
                  throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(postsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsFetchSinglePost(id) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(`${api}/posts/${id}`, { headers })
            .then((response) => {
                if (!response.ok) {
                  throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((item) => dispatch(singlePostFetchDataSuccess(item)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsFetchComments(id) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(`${api}/posts/${id}/comments`, { headers })
            .then((response) => {
                if (!response.ok) {
                  throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(commentsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function changePostScore(direction, id) {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ option: direction })
        })
        .then(() => dispatch(updatePostScore(direction, id)))
        .then(() => dispatch(updateMainPostScore(direction, id)))
    };
}

export function addNewComment(commentId, body, author, parentId) {
    return (dispatch) => {
        fetch(`${api}/comments`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ 
            id: commentId.toString(),
            timeStamp: Date.now(),
            body: body,
            author: author,
            parentId: parentId
         })
        })
        .then(() => dispatch(addComment([{
            id: commentId.toString(),
            parentId: parentId,
            timestamp: Date.now(),
            body: body,
            author: author,
            voteScore: 1,
            deleted: false,
            parentDeleted: false
        }]
        )))
    }
}

export function updateExistingComment(commentId, body) {
    return (dispatch) => {
        fetch(`${api}/comments/${commentId}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify({ 
            timestamp: Date.now(),
            body: body
         })
        })
        .then(() => dispatch(updateComment(commentId, body)))
    }
}

export function changeCommentScore(direction, id) {
    return (dispatch) => {
        fetch(`${api}/comments/${id}`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ option: direction })
        })
        .then(() => dispatch(updateCommentScore(direction, id)))
    };
}

export function deleteExistingComment(commentId) {
    return (dispatch) => {
        fetch(`${api}/comments/${commentId}`, {
          headers,
          method: 'DELETE',
        })
        .then(() => dispatch(deleteComment(commentId)))
    };
}

export function deleteExistingPost(postId) {
    return (dispatch) => {
        fetch(`${api}/posts/${postId}`, {
          headers,
          method: 'DELETE',
        })
        .then(() => dispatch(deletePost(postId)))
    };
}

export function addNewPost(id, title, body, author, category) {
    return (dispatch) => {
        fetch(`${api}/posts`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ 
            id: id.toString(),
            timestamp: Date.now(),
            title: title,
            body: body,
            author: author,
            category: category
         })
        })
        .then(() => dispatch(addPost([{
            id: id.toString(),
            timestamp: Date.now(),
            title: title,
            body: body,
            author: author,
            category: category
        }]
        )))
    }
}

export function updateExistingPost(id, title, body) {
    return (dispatch) => {
        fetch(`${api}/posts/${id}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify({ 
            timestamp: Date.now(),
            title: title,
            body: body
         })
        })
        .then(() => dispatch(updatePost(id, title, body)))
    }
}