//Base
import React from "react";
import ReactDOM from "react-dom";

export default class ConversationsComponent extends React.Component {
  openConversation(e, conversation) {
    this.props.openConversation(e, conversation);
  };

  render() {
    const { conversations } = this.props;

    return (
      <ul className="notification-list chat-message">
        {
          conversations.map((c, i) =>
            <li key={i} onClick={event => this.openConversation(event, c)}>
              <div className="author-thumb">
                <img src={c.user.profile_picture.thumb.url} alt="author"/>
              </div>
              <div className="notification-event">
                <a href="#" className="h6 notification-friend">
                  {c.user.first_name + " " + c.user.last_name}
                </a>
                <span className="chat-message-item text-ellipsis">
                  {c.last_message}
                </span>
                <span className="notification-date">
                  <time className="entry-date updated">
                    {c.last_message_timestamp}
                  </time>
                </span>
              </div>
              <span className="notification-icon">
                <svg className="olymp-chat---messages-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
              </span>
              <div className="more">
                <svg className="olymp-three-dots-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
              </div>
            </li>
          )
        }
      </ul>
    )
  }
}