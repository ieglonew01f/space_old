export default function reducer(state={
    activities: null,
    fetching: false,
    posting: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_ACTIVITIES": {
        return {...state, fetching: true}
      }
      case "FETCH_ACTIVITIES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_ACTIVITIES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          activities: action.payload.data,
        }
      }
    }
    return state
}
