export default function reducer(state={
    fetching: false,
    fetched: false,
    error: null,
    suggestions: [],
  }, action) {
    switch (action.type) {
      case "FETCH_SUGGESTIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_SUGGESTIONS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_SUGGESTIONS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          suggestions: action.payload.data,
        }
      }
    }

    return state
}
