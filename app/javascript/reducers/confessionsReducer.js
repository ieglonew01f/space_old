export default function reducer(state={
    comments: [],
    fetching: false,
    posting: false,
    fetched: false,
    error: null,
    confessions: []
  }, action) {
    switch (action.type) {
      case "FETCH_CONFESSIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_CONFESSIONS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_CONFESSIONS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          confessions: action.payload.data,
        }
      }
    }
    return state
}
