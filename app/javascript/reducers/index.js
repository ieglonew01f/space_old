import { combineReducers } from "redux"

import posts from "./postsReducer"
import comments from "./commentsReducer"
import likes from "./likesReducer.js"
import suggestions from "./usersReducer.js"
import activities from "./activitiesReducer.js"
import forecast from "./forecastsReducer.js"
import videos from "./videosReducer.js"
import results from "./searchReducer.js"
import birthdays from "./birthdaysReducer.js"
import photos from "./photosReducer.js"
import dedications from "./dedicationsReducer.js"
import confessions from "./confessionsReducer.js"
import blogs from "./blogsReducer.js"

export default combineReducers({
  posts,
  comments,
  likes,
  suggestions,
  activities,
  forecast,
  videos,
  results,
  birthdays,
  photos,
  dedications,
  confessions,
  blogs
})
