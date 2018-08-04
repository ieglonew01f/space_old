//Base
import React from "react";
import ReactDOM from "react-dom";

export default class VideoComponent extends React.Component {
  render() {
    const { video } = this.props;

    if (!video.is_video) return null;

    return (
      <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
        <div className="ui-block video-item">
          <div className="video-player">
            <img src={video.best_image} alt="photo"/>
            <a href={video.url} className="play-video">
              <svg className="olymp-play-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-play-icon"></use></svg>
            </a>
            <div className="overlay overlay-dark"></div>
          </div>
          <div className="ui-block-content video-content">
            <a href={video.url} className="h6 title">{video.title}</a>
          </div>
        </div>
      </div>
    )
  }
}
