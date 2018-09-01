import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function fetchPosts(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_POSTS"});

    var url = '/posts';

    //user post
    if (id) {
      url = '/users/' + id + '/posts';
    }

    axios
      .get(url, {
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

export function addPost(post_text, post_type, post_link, post_meta_id, post_title) {
  return function(dispatch) {
    dispatch({type: "ADD_POST"});

    axios
      .post('/posts', {
        post_text: post_text,
        post_type: post_type,
        post_link: JSON.stringify(post_link),
        post_meta_id: post_meta_id,
        authenticity_token: AUTH_TOKEN,
        post_title: post_title
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

export function likePost(post_id) {
  return function(dispatch) {
    dispatch({type: "LIKE_POST"});

    axios
      .post("/posts/" + post_id + "/likes", {
        post_id: post_id,
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        dispatch({type: "LIKE_POST_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "LIKE_POST_REJECTED", payload: err})
      });
  }
}

export function fetchLikes(post_id) {
  return function(dispatch) {
    dispatch({type: "FETCH_LIKES"});

    axios
      .get("/posts/" + post_id + "/likes", {
        params: {
          post_id: post_id,
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_LIKES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_LIKES_REJECTED", payload: err})
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
