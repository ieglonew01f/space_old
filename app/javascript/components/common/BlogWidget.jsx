import React from "react";
import ReactDOM from "react-dom";

import ActiveLoader from "./ActiveLoader";

export default class BlogWidget extends React.Component {
  render() {
    const { blogs } = this.props;

    var elem = null

    if (blogs && blogs.length != 0) {
      elem = <div className="ui-block">
      	<div className="ui-block-title">
      		<h6 className="title">Blog Posts</h6>
      	</div>
        <ul className="widget w-blog-posts">
          {
            blogs.map((blog, i) =>
              <li key={i}>
          			<article className="hentry post">
          				<a href={"/blogs/" + blog.id} className="h4">{blog.post_title}</a>
          				<div className="post__date">
          					<time className="published">
          						{blog.timestamp}
          					</time>
          				</div>
          			</article>
          		</li>
            )
          }
        </ul>
      </div>
    }

    return(
      <div>
        <ActiveLoader object={blogs} type="side-widget"/>
        {elem}
      </div>
    )
  }
}
