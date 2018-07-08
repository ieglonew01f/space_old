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
    const { post, comments, posting } = this.props;

    return (
      <div className={comments.length === 0 ? 'hidden' : ''}>
        <div className="comments-list-outer">
          <ul className="comments-list">
            {
              comments.map((comment, i) =>
                <Comment key={i} comment={comment}/>
              )
            }
          </ul>
          <a href="#" className="more-comments">View more comments <span>+</span></a>
        </div>
        <div className="comments-action">
          <form className="comment-form inline-items">
            <div className="post__author author vcard inline-items">
              <img src="/img/author-page.jpg" alt="author"/>
              <div className="form-group with-icon-right is-empty">
                <textarea className="form-control" placeholder="" value={this.state.commentText} onChange={event => this.onChange(event)}></textarea>
                <div className="add-options-message">
                  <a href="#" className="options-message" data-toggle="modal" data-target="#update-header-photo">
                    <svg className="olymp-camera-icon">
                      <use xlinkHref="/svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
                    </svg>
                  </a>
                </div>
              <span className="material-input"></span></div>
            </div>
            <CommentSubmitButton post={post} posting={posting} postComment={event => this.postComment(event)}/>
            <button className="btn btn-md-2 btn-border-think c-grey btn-transparent custom-color">Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}
