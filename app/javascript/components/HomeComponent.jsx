//Base
import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";
import { fetchPosts, addPost } from "../actions/postsActions";
import { fetchActivities, fetchSuggestions, fetchForecast, fetchBirthdays } from "../actions/pageActions";
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
import ActiveLoader from "./common/ActiveLoader";
import SetUpWizard from "./common/SetUpWizard";

@connect((store) => {
  return {
    posts: store.posts.posts,
    posting: store.posts.posting,
    parsedLink: store.posts.post_link_data,
    activities: store.activities.activities,
    suggestions: store.suggestions.suggestions,
    forecast: store.forecast.forecast,
    birthdays: store.birthdays.birthdays
  };
})

export default class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      postText: '',
      postType: 1,
      postMeta: this.props.parsedLink,
      post_images_id: null
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchActivities());
    this.props.dispatch(fetchSuggestions());
    this.props.dispatch(fetchForecast());
    this.props.dispatch(fetchBirthdays());

    setTimeout(function(){
      $('#post-image-form').ajaxForm({
          beforeSend: function() { //before sending form
              console.log('progress');
          },
          uploadProgress: function(event, position, total, percentComplete) { //on progress
              console.log(percentComplete);
          },
          complete: function(response) { // on complete
            var data = JSON.parse(response.responseText).data
            $('.post-image-upload-preview').html($('<img/>').attr('src', data.post_meta.thumb.url));
            $('.post-image-upload-preview').attr('data-post-image-id', data.id);
          }
      });
    }, 1000);

    const AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
    $('#authenticity_token').val(AUTH_TOKEN);
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

    this.props.dispatch(addPost(this.state.postText, this.state.postType, this.props.parsedLink, $('.post-image-upload-preview').attr('data-post-image-id')));

    //reset
    this.setState({ postText: '', postType: 1 });
    $('.post-image-upload-preview').html('');
    $('.post-image-upload-preview').attr('data-post-image-id', '');
  }

  onPasteLink(e) {
    setTimeout(this.getPostText.bind(this), 100);
  }

  getPostText() {
    if (isLink(this.state.postText)) {
      this.props.dispatch(parseLink(this.state.postText));
    }
  }

  clickUploadImagePost(e) {
    $("#post-image-file").trigger('click');
  }

  addPhotoPost(e) {
    //process photo and show in ui
    $('#post-image-form').submit();
  }

  render() {
    const { posts, posting, parsedLink, activities, suggestions, forecast, birthdays } = this.props;

    return (
      <div className="row">
          <aside className="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
            <BirthdayAlert birthdays={birthdays}/>
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
                        <li className="nav-item">
            							<a className="nav-link inline-items" data-toggle="tab" href="#blog" role="tab" aria-expanded="false">
            								<svg className="olymp-blog-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-blog-icon"></use></svg>
            								<span>Blog Post</span>
            							  <div className="ripple-container"></div>
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
                                <div id="post-text">

                                </div>
                                <PostMeta parsedLink={parsedLink}/>
                                <div className="add-options-message">
                                  <a onClick={event => this.clickUploadImagePost(event)} href="javascript:void(0)" className="options-message" data-toggle="tooltip" data-placement="top" data-original-title="ADD PHOTOS">
                										<svg className="olymp-camera-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
                									</a>
                                  <span className="post-image-upload-preview">

                                  </span>
                                  <PostSubmitButton posting={posting} postStatus={event => this.postStatus(event)}/>
                                </div>
                            </form>
                            <form id="post-image-form" onChange={event => this.addPhotoPost(event)} encType="multipart/form-data" action="/posts/upload_photos" acceptCharset="UTF-8" method="post">
                              <input hidden="true" type="file" id="post-image-file" name="images"/>
                              <input type="hidden" name="authenticity_token" id="authenticity_token"/>
                            </form>
                        </div>
                    </div>
                </div>
              </div>
              <div id="newsfeed-items-grid">
                <ActiveLoader object={posts} type="posts"/>
                <Posts posts={posts} />
              </div>
          </main>
          <aside className="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
            <ActivityFeed activities={activities}/>
            <FollowSuggestions suggestions={suggestions}/>
          </aside>
      </div>
    );
  }
}
