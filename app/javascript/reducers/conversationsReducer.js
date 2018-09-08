export default function reducer(state={
    conversations: [],
    fetching_conversations: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_CONVERSATIONS": {
        return {...state, fetching_conversations: true}
      }
      case "FETCH_CONVERSATIONS_REJECTED": {
        return {...state, fetching_conversations: false, error: action.payload}
      }
      case "FETCH_CONVERSATIONS_FULFILLED": {
        return {
          ...state,
          fetching_conversations: false,
          conversations: action.payload.data
        }
      }
    }
    return state
}
