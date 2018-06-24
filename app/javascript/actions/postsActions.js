import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function fetchPosts() {
  return function(dispatch) {
    dispatch({type: "FETCH_POSTS"});

    axios
      .get("/posts", {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_POSTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_POSTS_REJECTED", payload: err})
      });
  }
}

export function addPost(post_text) {
  return function(dispatch) {
    dispatch({type: "ADD_POST"});

    axios
      .post('/posts', {
        post_text: post_text,
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        dispatch({type: "ADD_POST_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "ADD_POST_REJECTED", payload: err})
      });
  }
}
export function deletePost(id) {
  return function(dispatch) {
    dispatch({type: "DELETE_POST"});

    axios
      .delete('/posts/' + id, {
        params: {
          authenticity_token: AUTH_TOKEN,
          post_id: id
        }
      })
      .then((response) => {
        dispatch({type: "DELETE_POST_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "DELETE_POST_REJECTED", payload: err})
      });
  }
}

//
// export function updateTweet(id, text) {
//   return {
//     type: 'UPDATE_TWEET',
//     payload: {
//       id,
//       text,
//     },
//   }
// }
//
// export function deleteTweet(id) {
//   return { type: 'DELETE_TWEET', payload: id}
// }
