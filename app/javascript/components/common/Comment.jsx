import React from "react";
import ReactDOM from "react-dom";

export default class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    return(
      <li className="comment-item">
        <div className="post__author author vcard inline-items">
          <img src="/img/author-page.jpg" alt="author"/>
          <div className="author-date">
            <a className="h6 post__author-name fn" href="02-ProfilePage.html">James Spiegel</a>
            <div className="post__date">
              <time className="published" dateTime="2004-07-24T18:18">
                38 mins ago
              </time>
            </div>
          </div>
          <a href="#" className="more"><svg className="olymp-three-dots-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
        </div>
        <p>{comment.comment_text}</p>
        <a href="#" className="post-add-icon inline-items">
          <svg className="olymp-heart-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
          <span>3</span>
        </a>
        <a href="#" className="reply">Reply</a>
      </li>
    )
  }
}
