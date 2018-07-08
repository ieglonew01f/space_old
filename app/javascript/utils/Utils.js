import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function isLink(string) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex.test(string)) {
    return false;
  } else {
    return true;
  }
}

export function parseLink(postLink) {
  return function(dispatch) {
    dispatch({type: "PARSE_POST_LINK"});

    axios
      .post('/posts/parseLink', {
        post_link: postLink,
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        dispatch({type: "PARSE_POST_LINK_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "PARSE_POST_LINK_REJECTED", payload: err})
      });
  }
}
