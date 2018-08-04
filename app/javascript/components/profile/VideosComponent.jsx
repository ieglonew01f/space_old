//Base
import React from "react";
import ReactDOM from "react-dom";

import VideoComponent from "./VideoComponent";

export default class VideosComponent extends React.Component {
  render() {
    const { videos } = this.props;

    return (
      videos.map((v, i) =>
        <VideoComponent key={i} video={JSON.parse(v.post_link)}/>
      )
    )
  }
}
