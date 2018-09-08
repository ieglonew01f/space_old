export default function reducer(state={
    messages: [],
    fetching_messages: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_MESSAGES": {
        return {...state, fetching_messages: true}
      }
      case "FETCH_MESSAGES_REJECTED": {
        return {...state, fetching_messages: false, error: action.payload}
      }
      case "FETCH_MESSAGES_FULFILLED": {
        return {
          ...state,
          fetching_messages: false,
          messages: action.payload.data,
        }
      }
    }
    return state
}
