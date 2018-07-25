export default function reducer(state={
    likes: [],
    fetching: false,
    posting: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "FETCH_LIKES": {
        return {...state, fetching: true}
      }
      case "FETCH_LIKES_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_LIKES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          comments: action.payload.data,
        }
      }
      case "ADD_LIKE": {
        return {...state, posting: true}
      }
      case "ADD_LIKE_REJECTED": {
        return {...state, posting: false, error: action.payload}
      }
      case "ADD_LIKE_FULFILLED": {
        return {
          ...state,
          posting: false,
          comments: [action.payload.data, ...state.comments],
        }
      }
      case "DELETE_LIKE": {
        return {...state, fetching: true}
      }
      case "DELETE_LIKE_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "DELETE_LIKE_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          comments: state.comments.filter(post => post.id !== action.payload.data.id),
        }
      }
      // case "UPDATE_TWEET": {
      //   const { id, text } = action.payload
      //   const newTweets = [...state.tweets]
      //   const tweetToUpdate = newTweets.findIndex(tweet => tweet.id === id)
      //   newTweets[tweetToUpdate] = action.payload;
      //
      //   return {
      //     ...state,
      //     tweets: newTweets,
      //   }
      // }
      // case "DELETE_TWEET": {
      //   return {
      //     ...state,
      //     tweets: state.tweets.filter(tweet => tweet.id !== action.payload),
      //   }
      // }
    }

    return state
}
