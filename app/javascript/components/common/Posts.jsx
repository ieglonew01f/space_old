import React from 'react';
import { render } from 'react-dom';

import { connect } from "react-redux";
import { deletePost } from "../../actions/postsActions";
import { fetchComments } from "../../actions/commentsActions";

import PostMeta from "./PostMeta";
import PostAuthor from "./PostAuthor";
import Comments from "./Comments";

@connect((store) => {
  return {
    posts: store.posts.posts,
    comments: store.comments.comments
  };
})

export default class Posts extends React.Component {
  deletePost(e, post_id) {
    this.props.dispatch(deletePost(post_id));
  }

  fetchComments(e, post_id) {
    e.preventDefault();
    this.props.dispatch(fetchComments(post_id));
  }

  render() {
    const {posts, comments} = this.props;

    return <ul>
      {
        posts.map((post, i) =>
          <div key={i} data-post-id={post.id} className="ui-block">
            <article className="hentry post video">
              <div className="post__author author vcard inline-items">
                <img src="/img/avatar7-sm.jpg" alt="author"/>
                <PostAuthor post={post}/>
                <div className="more"><svg className="olymp-three-dots-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                  <ul className="more-dropdown">
                    <li>
                      <a href="#">Edit Post</a>
                    </li>
                    <li>
                      <a href="#" onClick={event => this.deletePost(event, post.id)}>Delete Post</a>
                    </li>
                    <li>
                      <a href="#">Turn Off Notifications</a>
                    </li>
                    <li>
                      <a href="#">Select as Featured</a>
                    </li>
                  </ul>
                </div>
              </div>
              <p>{post.post_text}</p>
              <PostMeta parsedLink={JSON.parse(post.post_meta)}/>
              <div className="post-additional-info inline-items">
                <a href="#" className="post-add-icon inline-items">
                  <svg className="olymp-heart-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                  <span>18</span>
                </a>
                <ul className="friends-harmonic">
                  <li>
                    <a href="#">
                      <img src="/img/friend-harmonic9.jpg" alt="friend"/>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/friend-harmonic10.jpg" alt="friend"/>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/friend-harmonic7.jpg" alt="friend"/>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/friend-harmonic8.jpg" alt="friend"/>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/img/friend-harmonic11.jpg" alt="friend"/>
                    </a>
                  </li>
                </ul>
                <div className="names-people-likes">
                  <a href="#">Jenny</a>, <a href="#">Robert</a> and
                  <br/>18 more liked this
                </div>
                <div className="comments-shared">
                  <a href="#" className="post-add-icon inline-items" onClick={event => this.fetchComments(event, post.id)}>
                    <svg className="olymp-speech-balloon-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                    <span>0</span>
                  </a>
                  <a href="#" className="post-add-icon inline-items">
                    <svg className="olymp-share-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                    <span>16</span>
                  </a>
                </div>
              </div>
              <div className="control-block-button post-control-button">
                <a href="#" className="btn btn-control">
                  <svg className="olymp-like-post-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
                </a>
                <a href="#" className="btn btn-control" onClick={event => this.fetchComments(event, post.id)}>
                  <svg className="olymp-comments-post-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                </a>
                <a href="#" className="btn btn-control">
                  <svg className="olymp-share-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                </a>
              </div>
            </article>
            <Comments post={post} comments={comments}/>
          </div>
        )
      }
    </ul>
  }
}
