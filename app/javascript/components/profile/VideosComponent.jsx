//Base
import React from "react";
import ReactDOM from "react-dom";

import VideoComponent from "./VideoComponent";
import ActiveLoader from "../common/ActiveLoader";

export default class VideosComponent extends React.Component {
  render() {
    const { videos } = this.props;

    var elem = null;

    if (videos && videos.length != 0) {
      elem =       videos.map((v, i) =>
              <VideoComponent key={i} video={JSON.parse(v.post_link)}/>
            )
    }

    return (
      <div className="row">
        {elem}
        <ActiveLoader object={videos} type="left-sm"/>
      </div>
    )
  }
}
