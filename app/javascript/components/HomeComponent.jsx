//Base
import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";
import { fetchPosts, addPost } from "../actions/postsActions";
import { fetchActivities, fetchSuggestions, fetchForecast } from "../actions/pageActions";
import { isLink, parseLink } from "../utils/Utils";

//UI
import Posts from "./common/Posts";
import PostMeta from "./common/PostMeta";
import LoadMoreButton from "./common/LoadMoreButton";
import PostSubmitButton from "./common/PostSubmitButton";
import ActivityFeed from "./common/ActivityFeed";
import BirthdayAlert from "./common/BirthdayAlert";
import FollowSuggestions from "./common/FollowSuggestions";
import Weather from "./common/Weather";

@connect((store) => {
  return {
    posts: store.posts.posts,
    posting: store.posts.posting,
    parsedLink: store.posts.post_link_data,
    activities: store.activities.activities,
    suggestions: store.suggestions.suggestions,
    forecast: store.forecast.forecast
  };
})

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      postText: '',
      postType: 1,
      postMeta: this.props.parsedLink
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchActivities());
    this.props.dispatch(fetchSuggestions());
    this.props.dispatch(fetchForecast());
  }

  onChange (e) {
    this.setState({ postText: e.target.value });
  }

  postStatus(e) {
    e.preventDefault();

    //if its a link post?
    if (this.props.parsedLink) {
      this.state.postType = 2;
    }

    this.props.dispatch(addPost(this.state.postText, this.state.postType, this.props.parsedLink));

    //reset
    this.setState({ postText: '', postType: 1 });
  }

  onPasteLink(e) {
    setTimeout(this.getPostText.bind(this), 100);
  }

  getPostText() {
    if (isLink(this.state.postText)) {
      this.props.dispatch(parseLink(this.state.postText));
    }
  }

  render() {
    const { posts, posting, parsedLink, activities, suggestions, forecast } = this.props;

    return (
      <div className="row">
          <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
            <Weather forecast={forecast}/>
          </aside>
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
                                <div className="author-thumb status-div">
                                    <img src={window.current_user.profile_picture} alt="author"/>
                                </div>
                                <div className="form-group with-icon label-floating is-empty">
                                    <textarea className="form-control" placeholder="Share what you are thinking here..." value={this.state.postText} onChange={event => this.onChange(event)} onPaste={event => this.onPasteLink(event)}></textarea>
                                </div>
                                <PostMeta parsedLink={parsedLink}/>
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
          <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
            <BirthdayAlert/>
            <ActivityFeed activities={activities}/>
            <FollowSuggestions suggestions={suggestions}/>
          </aside>
      </div>
    );
  }
}
