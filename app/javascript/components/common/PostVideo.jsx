import React from "react";
import ReactDOM from "react-dom";

export default class PostVideo extends React.Component {
  render() {
    const { parsedLink } = this.props;

    var postVideo = null;

    if (parsedLink) {
      postVideo = <div className="post-video">
        <div className="video-thumb">
        	<img src={parsedLink.best_image} alt="photo"/>
        	<a target="_blank" href={parsedLink.url} className="play-video">
        		<svg className="olymp-play-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-play-icon"></use></svg>
        	</a>
        </div>
        <div className="video-content">
        	<a target="_blank" href={parsedLink.url} className="h4 title">{parsedLink.title}</a>
        	<p>
            {parsedLink.description}
        	</p>
        	<a target="_blank" href={parsedLink.url} className="link-site">YOUTUBE.COM</a>
        </div>
      </div>
    }

    return (
        postVideo
    );
  }

}
