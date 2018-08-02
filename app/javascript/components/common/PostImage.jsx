import React from "react";
import ReactDOM from "react-dom";

export default class PostImage extends React.Component {
  render() {
    const { post } = this.props;

    var postImageElem = null;

    //check if photo
    if (post.post_image) {
      postImageElem = <div className="post-thumb">
							<img src={post.post_image} alt="photo"/>
						</div>
    }

    return (
        postImageElem
    );
  }

}
