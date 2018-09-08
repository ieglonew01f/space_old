import React from "react";
import ReactDOM from "react-dom";

//UI
import Messages from "./Messages";

export default class ConversationMessages extends React.Component {
  render() {
    const { messages, fetching_messages, current_conversation } = this.props;

    var elem = null;

    if (!current_conversation) {
      elem = 
        <div className="inbox-intro">
          <img src="/img/image-3.svg"/>
          <div className="intro">
            You can start a new conversation with someone or resume existing conversations.
          </div>
        </div>
    }
    else {
      if (messages.length == 0) {
        elem = <div className="chat-field">
          <div className="ui-block-title">
            <h6 className="title">Elaine Dreyfuss</h6>
          </div>
          <ul className="notification-list chat-message chat-message-field">
            No Message
          </ul>
          <form>
            <div className="form-group label-floating is-empty">
              <label className="control-label">Write your reply here...</label>
              <textarea className="form-control" placeholder=""></textarea>
            <span className="material-input"></span></div>
            <div className="add-options-message">           
              <button className="btn btn-primary btn-sm">Post Reply</button>
            </div>
          </form>
        </div>
      }
      else {
        elem = <div className="chat-field">
          <div className="ui-block-title">
            <h6 className="title">{current_conversation.user.first_name + " " + current_conversation.user.last_name}</h6>
          </div>
          <ul className="notification-list chat-message chat-message-field ul-chat-messages">
          {
            messages.map((message, i) =>
              <li key={i}>
                <div className="author-thumb">
                  <img src={message.user.profile_picture.thumb.url} alt="author"/>
                </div>
                <div className="notification-event right">
                  <a href="#" className="h6 notification-friend">{message.user.first_name + " " + message.user.last_name}</a>
                  <span className="notification-date"><time className="entry-date updated">{message.timestamp}</time></span>
                  <span className="chat-message-item">{message.message.content}</span>
                </div>
              </li>
            )
          }
          </ul>
          <form>
            <div className="form-group label-floating is-empty">
              <label className="control-label">Write your reply here...</label>
              <textarea className="form-control" placeholder=""></textarea>
            <span className="material-input"></span></div>
            <div className="add-options-message">           
              <button className="btn btn-primary btn-sm">Post Reply</button>
            </div>
          </form>
        </div>
      }
    }

    return elem
  }
}