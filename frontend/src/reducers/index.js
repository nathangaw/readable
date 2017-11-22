import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
/* import { ITEMS_HAS_ERRORED, ITEMS_IS_LOADING, ITEMS_FETCH_DATA_SUCCESS } from '../actions/index'; */

export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
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
        /*case 'FILTER_POSTS':
            return state.slice().filter( post => post.category === action.category );*/

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



export default combineReducers({
  categories,
  posts,
  itemsHasErrored,
  itemsIsLoading,
  filteredPosts,
  router: routerReducer
});
