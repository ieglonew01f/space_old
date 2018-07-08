import React from "react";
import ReactDOM from "react-dom";

export default class PostLink extends React.Component {
  render() {
    const { parsedLink } = this.props;

    var postLink = null;

    if (parsedLink) {
      postLink = <div className="post-video">
        <div className="video-thumb">
        	<img src={parsedLink.best_image} alt="photo"/>
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
        postLink
    );
  }

}
