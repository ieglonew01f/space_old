export default function reducer(state={
    fetching: false,
    fetched: false,
    error: null,
    forecast: {
      temp: "-",
      text: "-",
      low: "-",
      high: "-",
      humidity: "-",
      chill: "-",
      location: "-",
      weeks: [],
      date: "-"
    },
  }, action) {
    switch (action.type) {
      case "FETCH_FORECAST": {
        return {...state, fetching: true}
      }
      case "FETCH_FORECAST_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_FORECAST_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          forecast: {
            temp: action.payload.data.query.results.channel.item.condition.temp,
            text: action.payload.data.query.results.channel.item.condition.text,
            high: action.payload.data.query.results.channel.item.forecast[0].high,
            low: action.payload.data.query.results.channel.item.forecast[0].low,
            humidity: action.payload.data.query.results.channel.atmosphere.humidity,
            chill: action.payload.data.query.results.channel.wind.chill,
            location: action.payload.data.query.results.channel.location.city + ", " + action.payload.data.query.results.channel.location.region,
            weeks: action.payload.data.query.results.channel.item.forecast.slice(1,8),
            date: action.payload.data.query.results.channel.item.condition.date
          }
        }
      }
    }
    return state
}
