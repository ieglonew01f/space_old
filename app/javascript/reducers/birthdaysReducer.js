export default function reducer(state={
    fetching: false,
    fetched: false,
    error: null,
    birthdays: null,
  }, action) {
    switch (action.type) {
      case "FETCH_BIRTHDAYS": {
        return {...state, fetching: true}
      }
      case "FETCH_BIRTHDAYS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_BIRTHDAYS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          birthdays: action.payload.data
        }
      }
    }
    return state
}
