//Base
import React from "react";
import ReactDOM from "react-dom";

export default class FollowersDetailComponent extends React.Component {
  render() {
    const { suggestions } = this.props;

    return (
      suggestions.map((follower, i) =>
        <div key={i} className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
          <div className="ui-block">
            <div className="friend-item">
              <div className="friend-header-thumb">
                <img src={follower.user.banner.url} alt="friend"/>
              </div>
              <div className="friend-item-content">
                <div className="friend-avatar">
                  <div className="author-thumb">
                    <img src={follower.user.profile_picture.thumb.url} alt="author"/>
                  </div>
                  <div className="author-content">
                    <a href={"/profile/" + follower.user.username} className="h5 author-name">{follower.user.first_name} {follower.user.last_name}</a>
                    <div className="country">{follower.user.location}</div>
                  </div>
                </div>
                <div className="swiper-container" data-slide="fade">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="friend-count" data-swiper-parallax="-500">
                        <a href="#" className="friend-count-item">
                          <div className="h6">{follower.user_meta.followers_count}</div>
                          <div className="title">Followers</div>
                        </a>
                        <a href="#" className="friend-count-item">
                          <div className="h6">{follower.user_meta.photos_count}</div>
                          <div className="title">Photos</div>
                        </a>
                        <a href="#" className="friend-count-item">
                          <div className="h6">{follower.user_meta.videos_count}</div>
                          <div className="title">Videos</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}
