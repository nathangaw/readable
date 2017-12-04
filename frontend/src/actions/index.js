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

/*
export function setActivePost(post) {
  return {
    type: 'SET_ACTIVE_POST',
    post
  }
}
*/

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

export function addComment(comment) {
    return {
      type: 'ADD_COMMENT',
      comment
    }
  }


/* thunk function */
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
