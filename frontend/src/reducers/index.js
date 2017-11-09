import { combineReducers } from 'redux'
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
            return action.items;
        default:
            return state;
    }
}



export default combineReducers({
  categories,
  posts,
  itemsHasErrored,
  itemsIsLoading
});
