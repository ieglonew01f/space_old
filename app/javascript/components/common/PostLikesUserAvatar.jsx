//Base
import React from "react";
import ReactDOM from "react-dom";

import ActiveLoader from "../common/ActiveLoader";

export default class PostLikesUserAvatar extends React.Component {

  render() {
    const { post } = this.props;
    var elemLikeIcons = null;
    var elemLikeMore = null;

    if (post.like_details && post.like_details.length != 0) {

      if (post.likes_count > 1) {
        var counterText = <span> and <br/> {(parseInt(post.likes_count, 10) - 1)} more has liked this</span>
      }
      else if (post.likes_count == 1) {
        var counterText = " has liked this"
      }

      elemLikeIcons =
      <ul key={1} className="friends-harmonic">
        {
          post.like_details.map((detail, i) =>
            <li key={i}>
              <a title={detail.name} href={"/profile/" + detail.username}>
                <img src={detail.profile_picture} alt="friend"/>
              </a>
            </li>
          )
        }
      </ul>

      elemLikeMore = <div key={2} className="names-people-likes">
        <a href={"/profile/" + post.last_liker.username}>{post.last_liker.name}</a>
        {counterText}
      </div>
    }

    return [elemLikeIcons, elemLikeMore]
  }
}
