import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function fetchActivities() {
  return function(dispatch) {
    dispatch({type: "FETCH_ACTIVITIES"});

    axios
      .get("/notifications/get_activities", {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_ACTIVITIES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_ACTIVITIES_REJECTED", payload: err})
      });
  }
}

export function fetchSuggestions() {
  return function(dispatch) {
    dispatch({type: "FETCH_SUGGESTIONS"});

    axios
      .get("/users/get_suggestions", {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_SUGGESTIONS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SUGGESTIONS_REJECTED", payload: err})
      });
  }
}
