export default function reducer(state={
    fetching: false,
    fetched: false,
    error: null,
    results: [],
  }, action) {
    switch (action.type) {
      case "FETCH_SEARCH_RESULTS": {
        return {...state, fetching: true}
      }
      case "FETCH_SEARCH_RESULTS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_SEARCH_RESULTS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          results: action.payload.data
        }
      }
    }
    return state
}
