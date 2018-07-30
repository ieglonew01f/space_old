import { combineReducers } from "redux"

import posts from "./postsReducer"
import comments from "./commentsReducer"
import likes from "./likesReducer.js"
import suggestions from "./usersReducer.js"
import activities from "./activitiesReducer.js"
import forecast from "./forecastsReducer.js"

export default combineReducers({
  posts,
  comments,
  likes,
  suggestions,
  activities,
  forecast
})
