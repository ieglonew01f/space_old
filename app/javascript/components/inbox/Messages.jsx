//Base
import React from "react";
import ReactDOM from "react-dom";

export default class Messages extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <div>
        <div className="author-thumb">
          <img src={message.user.profile_picture.thumb} alt="author"/>
        </div>
        <div className="notification-event">
          <a href="#" className="h6 notification-friend">{message.user.first_name + " " + message.user.last_name}</a>
          <span className="notification-date"><time className="entry-date updated">{message.timestamp}</time></span>
          <span className="chat-message-item">{message.message.content}</span>
        </div>
      </div>
    )
  }
}