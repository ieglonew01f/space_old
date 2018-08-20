//Base
import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";
import { fetchPosts, addPost } from "../actions/postsActions";
import { fetchActivities, fetchFollowers, fetchVideos, fetchPhotos, fetchDedications, fetchConfessions } from "../actions/pageActions";

//UI
import Posts from "./common/Posts";
import LoadMoreButton from "./common/LoadMoreButton";
import AboutComponent from "./profile/AboutComponent"
import FollowersDetailComponent from "./profile/FollowersDetailComponent";
import FollowersComponent from "./profile/FollowersComponent";
import VideosComponent from "./profile/VideosComponent";
import PhotosComponent from "./profile/PhotosComponent";
import ActivityFeed from "./common/ActivityFeed";
import SongDedications from "./common/SongDedications";
import Confessions from "./common/Confessions";
import ActiveLoader from "./common/ActiveLoader";

@connect((store) => {
  return {
    posts: store.posts.posts,
    posting: store.posts.posting,
    activities: store.activities.activities,
    suggestions: store.suggestions.suggestions,
    videos: store.videos.videos,
    photos: store.photos.photos,
    dedications: store.dedications.dedications,
    confessions: store.confessions.confessions
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
    this.props.dispatch(fetchPhotos(gon.id));
    this.props.dispatch(fetchDedications());
    this.props.dispatch(fetchConfessions());
  }

  render() {
    const { posts, posting, activities, suggestions, videos, photos, dedications, confessions } = this.props;
    var profileElement = null;

    switch(gon.page_component) {
        case 'followers':
          profileElement = <div>
            <FollowersDetailComponent suggestions={suggestions}/>
          </div>
          break;
        case 'videos':
          profileElement = <div>
            <VideosComponent videos={videos}/>
          </div>
          break;
          case 'photos':
            profileElement = <div>
              <PhotosComponent photos={photos}/>
            </div>
            break;
        default:
          profileElement = <div className="row">
        		<div className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
              <AboutComponent/>
              <FollowersComponent followers={suggestions}/>
            </div>
            <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
              <div id="newsfeed-items-grid">
                <ActiveLoader object={posts} type="posts"/>
                <Posts posts={posts} />
              </div>
            </div>
            <div className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
              <ActivityFeed activities={activities}/>
              <SongDedications dedications={dedications}/>
              <Confessions confessions={confessions}/>
            </div>
          </div>
    }

    return (
      profileElement
    )
  }
}
