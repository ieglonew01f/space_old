import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function fetchComments(post_id) {
  return function(dispatch) {
    dispatch({type: "FETCH_COMMENTS"});

    axios
      .get("/posts/" + post_id + "/comments", {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_COMMENTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_COMMENTS_REJECTED", payload: err})
      });
  }
}

export function addComment(post_id, comment_text) {
  return function(dispatch) {
    dispatch({type: "ADD_COMMENT"});

    axios
      .post("/posts/" + post_id + "/comments", {
        post_id: post_id,
        comment_text: comment_text,
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        dispatch({type: "ADD_COMMENT_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "ADD_COMMENT_REJECTED", payload: err})
      });
  }
}

// export function deletePost(id) {
//   return function(dispatch) {
//     dispatch({type: "DELETE_POST"});
//
//     axios
//       .delete('/posts/' + id, {
//         params: {
//           authenticity_token: AUTH_TOKEN,
//           post_id: id
//         }
//       })
//       .then((response) => {
//         dispatch({type: "DELETE_POST_FULFILLED", payload: response.data})
//       })
//       .catch((err) => {
//         dispatch({type: "DELETE_POST_REJECTED", payload: err})
//       });
//   }
// }

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
