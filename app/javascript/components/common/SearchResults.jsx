import React from "react";
import ReactDOM from "react-dom";

export default class SearchResults extends React.Component {
  render() {
    const { results } = this.props;
    return (
      results.map((r, i) =>
        <a key={i} className="inline-items" href={'/profile/' + r.username}>
          <div className="author-thumb">
            <img src={r.profile_picture.thumb.url} alt="avatar"/>
          </div>
          <div className="notification-event">
            <span className="h6 notification-friend">{r.first_name + ' ' + r.last_name}</span>
            <span className="chat-message-item">{r.college}</span>
          </div>
          <span className="notification-icon">
            <svg className="olymp-happy-face-icon">
              <use xlinkHref="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use>
            </svg>
          </span>
        </a>
      )
    );
  }
}
