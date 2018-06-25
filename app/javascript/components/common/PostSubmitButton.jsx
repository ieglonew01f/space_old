import React from "react";
import ReactDOM from "react-dom";

export default class PostSubmitButton extends React.Component {
  update = (e) => {
    this.props.postStatus(e);
  };

  render() {
    const { posting } = this.props;

    var postSubmitSpan;

    if (posting) {
      postSubmitSpan = <span className="post-button-loader">
        <img src="/svg-loaders/grid.svg"/> Adding Your Post
      </span>
    }
    else {
      postSubmitSpan = <span>Post Status</span>
    }

    return (
      <button className="btn btn-primary btn-md-2" onClick={this.update}>
        {postSubmitSpan}
      </button>
    );
  }

}
