import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
        case 'RESET_ERROR':
            return action.bool;
        
        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function categories(state = [], action) {
    switch (action.type) {
        case 'CATEGORIES_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}

export function posts(state = [], action) {
    switch (action.type) {
        case 'POSTS_FETCH_DATA_SUCCESS':
          // return post items and order by votescore
            return action.items.slice().sort(function(a, b) {
              return parseFloat(b.voteScore) - parseFloat(a.voteScore);
            });
        case 'ORDER_BY_VOTESCORE':
            if (action.direction === 'descend') {
              return state.slice().sort(function(a, b) {
                return parseFloat(b.voteScore) - parseFloat(a.voteScore);
              });
            } else {
              return state.slice().sort(function(a, b) {
                return parseFloat(a.voteScore) - parseFloat(b.voteScore);
              });
            }
        case 'ORDER_BY_DATE':
            if (action.direction === 'descend') {
              return state.slice().sort(function(a, b) {
                return parseFloat(b.timestamp) - parseFloat(a.timestamp);
              });
            } else {
              return state.slice().sort(function(a, b) {
                return parseFloat(a.timestamp) - parseFloat(b.timestamp);
              });
            }
        case 'UPDATE_MAIN_POST_SCORE':
        return state.map(post => {
            if (post.id === action.id) {
                if (action.direction === "upVote") {
                    post.voteScore += 1
                }
                if (action.direction === "downVote") {
                    post.voteScore -= 1
                }
            }
            return post
        })
        case 'DELETE_MAIN_POST':
            return state.filter( post => post.id !== action.postId)

        default:
            return state;
    }
}

export function filteredPosts(state = false, action) {
    switch (action.type) {
        case 'FILTER_POSTS':
            return action.category;
        default:
            return state;
    }
}

export function postEditMode(state = false, action) {
    switch (action.type) {
        case 'POST_EDIT_MODE':
            return action.bool;
        default:
            return state;
    }
}

export function activePost(state = {}, action) {
    switch (action.type) {
        case 'SINGLE_POST_FETCH_DATA_SUCCESS':
            return action.item;

        case 'SET_ACTIVE_POST':
            return action.post;

        case 'UPDATE_POST_SCORE':

            let currentScore = state.voteScore
            if (action.direction === "upVote") {
                currentScore += 1
            } else {
                currentScore -= 1
            }

            return { ...state, voteScore: currentScore}

        case 'DELETE_POST':
            return {};

        case 'ADD_POST':
            return action.post;

        case 'UPDATE_POST':
            return { ...state, title: action.title, body: action.body}

        default:
            return state;
    }
}


export function activeComments(state = [], action) {
    switch (action.type) {
        case 'COMMENTS_FETCH_DATA_SUCCESS':
            return action.items.slice().sort(function(a, b) {
                return parseFloat(b.voteScore) - parseFloat(a.voteScore);
              })

        case 'ADD_COMMENT':
            return [...state, ...action.comment];

        case 'UPDATE_COMMENT_SCORE':
            return state.map(comment => {
                if (comment.id === action.id) {
                    if (action.direction === "upVote") {
                        comment.voteScore += 1
                    }
                    if (action.direction === "downVote") {
                        comment.voteScore -= 1
                    }
                }
                return comment
            })
        
        case 'UPDATE_COMMENT':
            return state.map(comment => {
                if (comment.id === action.commentId) {
                    comment.body = action.body
                }
                return comment
            })

        case 'DELETE_COMMENT':
            return state.filter(comment => comment.id !== action.commentId)

        default:
            return state;
    }
}


export default combineReducers({
  categories,
  posts,
  activePost,
  itemsHasErrored,
  itemsIsLoading,
  filteredPosts,
  activeComments,
  postEditMode,
  router: routerReducer
});
