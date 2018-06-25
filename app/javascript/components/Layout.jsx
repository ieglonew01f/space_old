import React from "react";
import Posts from "./common/Posts";
import LoadMoreButton from "./common/LoadMoreButton";
import PostSubmitButton from "./common/PostSubmitButton";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { fetchPosts, addPost } from "../actions/postsActions";

@connect((store) => {
  return {
    posts: store.posts.posts,
    posting: store.posts.posting
  };
})

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      posts: []
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  onChange (e) {
    this.setState({ postText: e.target.value });
  }

  postStatus(e) {
    e.preventDefault();

    this.props.dispatch(addPost(this.state.postText));
    this.setState({ postText: '' });
  }

  render() {
    const { posts, posting } = this.props;

    return (
      <div className="row">
          <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
              <div className="ui-block">
                <div className="news-feed-form">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active inline-items" data-toggle="tab" href="#home-1" role="tab" aria-expanded="true">
                                <svg className="olymp-status-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-status-icon"></use></svg>
                                <span>Status</span>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                            <form>
                                <div className="author-thumb">
                                    <img src="/img/author-page.jpg" alt="author"/>
                                </div>
                                <div className="form-group with-icon label-floating is-empty">
                                    <textarea className="form-control" placeholder="Share what you are thinking here..." value={this.state.postText} onChange={event => this.onChange(event)}></textarea>
                                </div>
                                <div className="add-options-message">
                                  <PostSubmitButton posting={posting} postStatus={event => this.postStatus(event)}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
              </div>
              <div id="newsfeed-items-grid">
                <Posts posts={posts} />
              </div>
              <LoadMoreButton/>
          </main>
      </div>
    );
  }
}
