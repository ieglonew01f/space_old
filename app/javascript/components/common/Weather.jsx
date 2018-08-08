import React from "react";
import ReactDOM from "react-dom";

export default class Weather extends React.Component {
  forecast_text_to_icon(str) {
    if (str.toLowerCase().includes("storm")) {
      return "/svg-icons/sprites/icons-weather.svg#olymp-weather-storm-icon";
    }
    else if (str.toLowerCase().includes("cloudy")) {
      return "/svg-icons/sprites/icons-weather.svg#olymp-weather-cloudy-icon";
    }
    else if (str.toLowerCase().includes("sunny")) {
      return "/svg-icons/sprites/icons-weather.svg#olymp-weather-sunny-icon";
    }
    else if (str.toLowerCase().includes("rain") || str.toLowerCase().includes("showers")) {
      return "/svg-icons/sprites/icons-weather.svg#olymp-weather-rain-icon";
    }
    else if (str.toLowerCase().includes("breezy")) {
      return "/svg-icons/sprites/icons-weather.svg#olymp-weather-wind-icon-header";
    }
  }

  render() {
    const { forecast } = this.props;

    return(
      <div className="ui-block">
        <div className="widget w-wethear">
          <div className="wethear-now inline-items">
            <div className="temperature-sensor">{forecast.temp}°</div>
            <div className="max-min-temperature">
              <span>{forecast.low}°</span>
              <span>{forecast.high}°</span>
            </div>
            <svg className="olymp-weather-partly-sunny-icon">
              <use xlinkHref={this.forecast_text_to_icon(forecast.text)}></use>
            </svg>
          </div>
          <div className="wethear-now-description">
            <div className="climate">{forecast.text}</div>
            <span>Humidity: <span>{forecast.humidity}%</span></span>
            <span>Wind Chill: <span>{forecast.chill}%</span></span>
          </div>
          <ul className="weekly-forecast">
            {
              forecast.weeks.map((week, i) =>
                <li key={i}>
                  <div className="day">{week.day}</div>
                  <svg className="olymp-weather-sunny-icon">
                    <use xlinkHref={this.forecast_text_to_icon(week.text)}></use>
                  </svg>
                  <div className="temperature-sensor-day">{week.high}°</div>
                </li>
              )
            }
          </ul>
          <div className="date-and-place">
            <h5 className="date">{forecast.date.replace("IST", "")}</h5>
            <div className="place">{forecast.location}</div>
          </div>
        </div>
      </div>
    )
  }
}
