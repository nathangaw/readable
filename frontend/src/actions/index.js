
export const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED'
export const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING'
export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'


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


/* thunk function */
const api = 'http://localhost:3001'

const headers = {
  'Authorization': 'letmein'
}

export function itemsFetchData() {
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
