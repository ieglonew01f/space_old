import { combineReducers } from "redux"

import posts from "./postsReducer"
import comments from "./commentsReducer"

export default combineReducers({
  posts,
  comments
})
