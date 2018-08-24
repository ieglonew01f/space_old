import React from "react";
import ReactDOM from "react-dom";

export default class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    return(
      <li className="comment-item">
        <div className="post__author author vcard inline-items">
          <img src={(comment.user_details.profile_picture) ? comment.user_details.profile_picture.thumb.url : "/avatars/default.png"} alt="author"/>
          <div className="author-date">
            <a className="h6 post__author-name fn" href="02-ProfilePage.html">{comment.user_details.first_name} {comment.user_details.last_name}</a>
            <div className="post__date">
              <time className="published">
                {comment.timestamp}
              </time>
            </div>
          </div>
        </div>
        <p>{comment.comment_text}</p>
      </li>
    )
  }
}
