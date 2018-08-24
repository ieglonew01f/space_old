import React from 'react';
import { render } from 'react-dom';

import { connect } from "react-redux";
import { likePost, deletePost } from "../../actions/postsActions";
import { fetchComments } from "../../actions/commentsActions";

import PostMeta from "./PostMeta";
import PostImage from "./PostImage"
import PostAuthor from "./PostAuthor";
import Comments from "./Comments";
import PostLikesUserAvatar from "./PostLikesUserAvatar"

@connect((store) => {
  return {
    likes: store.likes.likes,
    comments: store.comments.comments
  };
})

export default class Posts extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      showComments: []
    }
  }

  deletePost(e, post_id) {
    this.props.dispatch(deletePost(post_id));
  }

  fetchComments(post_id, e) {
    e.preventDefault();
    this.props.dispatch(fetchComments(post_id));
    this.state.showComments[post_id] = true;
  }

  likePost(post_id, e) {
    e.preventDefault();
    this.props.dispatch(likePost(post_id));
  }

  render() {
    const {posts, comments} = this.props;
    const { showComments } = this.state;

    return <ul>
      {
        posts.map((post, i) =>
          <div key={i} data-post-id={post.id} className="ui-block">
            <article className="hentry post video">
              <div className="post__author author vcard inline-items">
                <img src={(post.user_details.profile_picture) ? post.user_details.profile_picture.thumb.url : "/avatars/default.png"} alt="author"/>
                <PostAuthor post={post}/>
                <div className="more"><svg className="olymp-three-dots-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                  <ul className="more-dropdown">
                    <li>
                      <a href="#" onClick={event => this.deletePost(event, post.id)}>Delete Post</a>
                    </li>
                  </ul>
                </div>
              </div>
              <p>{post.post_text}</p>
              <PostImage post={post}/>
              <PostMeta parsedLink={JSON.parse(post.post_link)}/>
              <div className="post-additional-info inline-items">
                <a href="#" className="post-add-icon inline-items">
                  <svg className="olymp-heart-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                  <span>{post.likes_count}</span>
                </a>

                <PostLikesUserAvatar post={post}/>

                <div className="comments-shared">
                  <span className="post-add-icon inline-items">
                    <svg className="olymp-speech-balloon-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                    <span>{post.comments_count}</span>
                  </span>
                </div>
              </div>
              <div className="control-block-button post-control-button">
                <a href="javascript:void(0)" className="btn btn-control" onClick={event => this.likePost(post.id, event)}>
                  <svg className="olymp-like-post-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
                </a>
                <a href="#" className="btn btn-control" onClick={event => this.fetchComments(post.id, event)}>
                  <svg className="olymp-comments-post-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                </a>
              </div>
            </article>
            <Comments post={post} comments={comments} showComments={showComments}/>
          </div>
        )
      }
    </ul>
  }
}
