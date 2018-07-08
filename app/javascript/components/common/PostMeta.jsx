import React from "react";
import ReactDOM from "react-dom";

import PostVideo from "./PostVideo";
import PostLink from "./PostLink";

export default class PostMeta extends React.Component {
  render() {
    const { parsedLink } = this.props;

    var postMetaElem = null;

    //check if parsed link is a video
    if (parsedLink) {
      if (parsedLink.is_video) {
        postMetaElem = <PostVideo parsedLink={parsedLink}/>
      }
      else {
        postMetaElem = <PostLink parsedLink={parsedLink}/>
      }
    }

    return (
        postMetaElem
    );
  }

}
