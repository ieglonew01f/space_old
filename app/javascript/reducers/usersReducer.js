export default function reducer(state={
    fetching: false,
    fetched: false,
    error: null,
    suggestions: null
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
          suggestions: action.payload.data
        }
      }
      case "FETCH_FOLLOWERS": {
        return {...state, fetching: true}
      }
      case "FETCH_FOLLOWERS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_FOLLOWERS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          suggestions: action.payload.data
        }
      }
      case "FOLLOW_USER": {
        return {...state, fetching: true}
      }
      case "FOLLOW_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FOLLOW_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          suggestions: action.payload.data
        }
      }
    }
    return state
}
