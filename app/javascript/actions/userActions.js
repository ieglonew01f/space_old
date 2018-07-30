import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function followUser(id) {
  return function(dispatch) {
    dispatch({type: "FOLLOW_USER"});

    axios
      .post('/users/' + id + '/follow', {
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        dispatch({type: "FOLLOW_USER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FOLLOW_USER_REJECTED", payload: err})
      });
  }
}
