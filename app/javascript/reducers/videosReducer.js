export default function reducer(state={
    videos: null,
    fetching: false,
    posting: false,
    fetched: false,
    error: null
  }, action) {
    switch (action.type) {
      case "FETCH_VIDEOS": {
        return {...state, fetching: true}
      }
      case "FETCH_VIDEOS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_VIDEOS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          videos: action.payload.data
        }
      }
    }
    return state;
}
