import React from "react";
import ReactDOM from "react-dom";

export default class PostAuthor extends React.Component {
  render() {
    const { post } = this.props;

    var postTypeText = null,
        postMeta = JSON.parse(post.post_meta);

    //check if parsed link is a video
    if (postMeta) {
      if (postMeta.is_video) {
        postTypeText = " shared a video"
      }
      else {
        postTypeText = " shared a link"
      }
    }

    return (
      <div className="author-date">
        <a className="h6 post__author-name fn" href="#">{post.user_details.first_name + ' ' + post.user_details.last_name}</a>
        {postTypeText}
        <div className="post__date">
          <time className="published" dateTime="2004-07-24T18:18">
            March 4 at 2:05pm
          </time>
        </div>
      </div>
    );
  }

}
