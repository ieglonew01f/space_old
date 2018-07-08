import React from "react";
import ReactDOM from "react-dom";

export default class CommentSubmitButton extends React.Component {
  postComment = (e) => {
    this.props.postComment(e);
  };

  render() {
    const { posting, post } = this.props;

    var CommentSubmitSpan;

    if (posting) {
      CommentSubmitSpan = <span className="comment-button-loader">
        <img src="/svg-loaders/grid.svg"/> Adding Your Comment
      </span>
    }
    else {
      CommentSubmitSpan = <span>Post Comment</span>
    }

    return (
      <button className="btn btn-md-2 btn-primary" onClick={this.postComment}>
        {CommentSubmitSpan}
      </button>
    );
  }

}
