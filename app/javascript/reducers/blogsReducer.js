export default function reducer(state={
    blogs: null,
    fetching: false,
    posting: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_BLOGS": {
        return {...state, fetching: true}
      }
      case "FETCH_BLOGS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_BLOGS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          blogs: action.payload.data,
        }
      }
    }
    return state
}
