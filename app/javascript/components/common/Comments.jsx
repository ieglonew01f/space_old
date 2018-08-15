import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";
import { addComment } from "../../actions/commentsActions";

import Comment from "./Comment";
import CommentSubmitButton from "./CommentSubmitButton"

@connect((store) => {
  return {
    posting: store.posts.posting
  };
})

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      commentText: ''
    }
  }

  onChange (e) {
    this.setState({ commentText: e.target.value });
  }

  postComment(e) {
    e.preventDefault();

    this.props.dispatch(addComment(this.props.post.id, this.state.commentText));

    //reset
    this.setState({ commentText: ''});
  }

  render() {
    const { post, comments, posting, showComments } = this.props;

    var toShowComments = false;

    if (comments.length !== 0 && post.id == comments[0].post_id) {
      toShowComments = true
    }

    return (
      <div className={showComments[post.id] === true ? '' : 'hidden'}>
        <div className={toShowComments ? 'comments-list-outer' : 'comments-list-outer hidden'}>
          <ul className="comments-list">
            {
              comments.map((comment, i) =>
                <Comment key={comment.id} comment={comment}/>
              )
            }
          </ul>
        </div>
        <div className="comments-action">
          <form className="comment-form inline-items">
            <div className="post__author author vcard inline-items">
              <img src={window.current_user.profile_picture} alt="author"/>
              <div className="form-group with-icon-right is-empty">
                <textarea className="form-control" placeholder="" value={this.state.commentText} onChange={event => this.onChange(event)}></textarea>
              </div>
            </div>
            <CommentSubmitButton post={post} posting={posting} postComment={event => this.postComment(event)}/>
          </form>
        </div>
      </div>
    )
  }
}
