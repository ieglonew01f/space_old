import React from 'react';
import { render } from 'react-dom';

import { connect } from "react-redux";
import { deletePost } from "../../actions/postsActions";

@connect((store) => {
  return {
    posts: store.posts.posts
  };
})

export default class Posts extends React.Component {
  deletePost(e, post_id) {
    this.props.dispatch(deletePost(post_id));
  }

  render() {
    const posts = this.props.posts;

    return <ul>
      {
        posts.map((post, i) =>
          <div key={i} data-post-id={post.id} className="ui-block">
            <article className="hentry post video">
              <div className="post__author author vcard inline-items">
                <img src="/img/avatar7-sm.jpg" alt="author"/>
                <div className="author-date">
                  <a className="h6 post__author-name fn" href="#">Marina Valentine</a>
                  <div className="post__date">
                    <time className="published" dateTime="2004-07-24T18:18">
                      March 4 at 2:05pm
                    </time>
                  </div>
                </div>
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
                  <a href="#" className="post-add-icon inline-items">
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
                <a href="#" className="btn btn-control">
                  <svg className="olymp-comments-post-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                </a>
                <a href="#" className="btn btn-control">
                  <svg className="olymp-share-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                </a>
              </div>
            </article>
          </div>
        )
      }
    </ul>
  }
}
