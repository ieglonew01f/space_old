import axios from "axios";

const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

export function fetchSearchResults(q) {
  return function(dispatch) {
    dispatch({type: "FETCH_SEARCH_RESULTS"});

    axios
      .post("/search", {
        query: q,
        type: "users",
        authenticity_token: AUTH_TOKEN
      })
      .then((response) => {
        dispatch({type: "FETCH_SEARCH_RESULTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_SEARCH_RESULTS_REJECTED", payload: err})
      });
  }
}

export function fetchActivities(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_ACTIVITIES"});

    var url = "/notifications/get_activities";

    if (id) {
      url = "/users/" + id + "/activities"
    }

    axios
      .get(url, {
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

export function fetchBirthdays() {
  return function(dispatch) {
    dispatch({type: "FETCH_BIRTHDAYS"});

    axios
      .get('/users/get_birthdays', {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_BIRTHDAYS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BIRTHDAYS_REJECTED", payload: err})
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

export function fetchFollowers(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_FOLLOWERS"});

    axios
      .get("/users/" + id + "/followers", {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_FOLLOWERS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_FOLLOWERS_REJECTED", payload: err})
      });
  }
};

export function fetchVideos(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_VIDEOS"});

    axios
      .get("/users/" + id + "/videos", {
        params: {
          authenticity_token: AUTH_TOKEN
        }
      })
      .then((response) => {
        dispatch({type: "FETCH_VIDEOS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_VIDEOS_REJECTED", payload: err})
      });
  }
};

export function fetchForecast(id) {
  return function(dispatch) {
    dispatch({type: "FETCH_FORECAST"});

    var q = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + gon.location + "') and u='c'";

    axios
      .get('https://query.yahooapis.com/v1/public/yql?q=' + q + '&format=json')
      .then((response) => {
        dispatch({type: "FETCH_FORECAST_FULFILLED", payload: response})
      })
      .catch((err) => {
        dispatch({type: "FETCH_FORECAST_REJECTED", payload: err})
      });
  }
}
