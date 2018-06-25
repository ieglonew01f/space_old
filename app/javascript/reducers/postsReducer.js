export default function reducer(state={
    posts: [],
    fetching: false,
    posting: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_POSTS": {
        return {...state, fetching: true}
      }
      case "FETCH_POSTS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_POSTS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          posts: action.payload.data,
        }
      }
      case "ADD_POST": {
        return {...state, posting: true}
      }
      case "ADD_POST_REJECTED": {
        return {...state, posting: false, error: action.payload}
      }
      case "ADD_POST_FULFILLED": {
        return {
          ...state,
          posting: false,
          posts: [action.payload.data, ...state.posts],
        }
      }
      case "DELETE_POST": {
        return {...state, fetching: true}
      }
      case "DELETE_POST_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "DELETE_POST_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          posts: state.posts.filter(post => post.id !== action.payload.data.id),
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
