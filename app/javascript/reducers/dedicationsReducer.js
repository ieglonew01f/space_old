export default function reducer(state={
    comments: [],
    fetching: false,
    posting: false,
    fetched: false,
    error: null,
    dedications: []
  }, action) {
    switch (action.type) {
      case "FETCH_DEDICATIONS": {
        return {...state, fetching: true}
      }
      case "FETCH_DEDICATIONS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_DEDICATIONS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          dedications: action.payload.data,
        }
      }
    }
    return state
}
