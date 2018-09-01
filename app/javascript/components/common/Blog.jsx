//Base
import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";

@connect((store) => {
  return {
    post: gon.post
  };
})

export default class Blog extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      post: gon.post
    }
  }

  componentDidMount() {

  }

  render() {
    const { post } = this.props;

    return (
      <div className="row mt50">
      		<div className="col col-xl-12 m-auto col-lg-12 col-md-12 col-sm-12 col-12">
      			<div className="ui-block">
      				<article className="hentry blog-post single-post single-post-v2">
                <h2 className="h1 post-title">{post.post_title}</h2>
      					<div className="single-post-additional inline-items">
      						<div className="post__author author vcard inline-items">
      							<img src={(post.user_details.profile_picture) ? post.user_details.profile_picture.thumb.url : "/avatars/default.png"} className="avatar"/>
      							<div className="author-date not-uppercase">
      								<a className="h6 post__author-name fn" href={"/profile/" + post.user_details.username}>Jack Scorpio</a>
      								<div className="author_prof">
      									Author
      								</div>
      							</div>
      						</div>
      						<div className="post-date-wrap inline-items">
      							<svg className="olymp-calendar-icon">
      								<use xlinkHref="/svg-icons/sprites/icons.svg#olymp-calendar-icon"></use>
      							</svg>
      							<div className="post-date">
      								<a className="h6 date" href="javascript:;;">{post.timestamp}</a>
      							</div>
      						</div>
      						<div className="post-comments-wrap inline-items">
      							<svg className="olymp-comments-post-icon">
      								<use xlinkHref="/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
      							</svg>
      							<div className="post-comments">
      								<a className="h6 comments" href="#">{post.comments_count}</a>
      								<span>Comments</span>
      							</div>
      						</div>
      					</div>
                <div dangerouslySetInnerHTML={{__html: post.post_text}}></div>
      				</article>
      			</div>
      		</div>
      	</div>
    );
  }
}
