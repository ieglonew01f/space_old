//Base
import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";
import { fetchPosts, addPost } from "../actions/postsActions";
import { fetchActivities, fetchFollowers, fetchVideos } from "../actions/pageActions";

//UI
import Posts from "./common/Posts";
import LoadMoreButton from "./common/LoadMoreButton";
import AboutComponent from "./profile/AboutComponent"
import FollowersDetailComponent from "./profile/FollowersDetailComponent";
import FollowersComponent from "./profile/FollowersComponent";
import VideosComponent from "./profile/VideosComponent";
import ActivityFeed from "./common/ActivityFeed";

@connect((store) => {
  return {
    posts: store.posts.posts,
    posting: store.posts.posting,
    activities: store.activities.activities,
    suggestions: store.suggestions.suggestions,
    videos: store.videos.videos
  };
})

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts(gon.id));
    this.props.dispatch(fetchActivities(gon.id));
    this.props.dispatch(fetchFollowers(gon.id));
    this.props.dispatch(fetchVideos(gon.id));
  }

  render() {
    const { posts, posting, activities, suggestions, videos } = this.props;
    var profileElement = null;

    switch(gon.page_component) {
        case 'followers':
          profileElement = <div className="row">
            <FollowersDetailComponent suggestions={suggestions}/>
          </div>
          break;
        case 'videos':
          profileElement = <div className="row">
            <VideosComponent videos={videos}/>
          </div>
          break;
        default:
          profileElement = <div className="row">
        		<div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
              <AboutComponent/>
              <FollowersComponent/>
            </div>
            <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
              <div id="newsfeed-items-grid">
                <Posts posts={posts} />
              </div>
              <LoadMoreButton/>
            </div>
            <div className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
              <ActivityFeed activities={activities}/>
            </div>
          </div>
    }

    return (
      profileElement
    )
  }
}