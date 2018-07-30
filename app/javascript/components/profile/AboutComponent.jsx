//Base
import React from "react";
import ReactDOM from "react-dom";

export default class AboutComponent extends React.Component {
  render() {
    const {} = this.props;

    return (
      <div className="ui-block">
				<div className="ui-block-title">
					<h6 className="title">Profile Intro</h6>
				</div>
				<div className="ui-block-content">
					<ul className="widget w-personal-info item-block">
						<li>
							<span className="title">About Me:</span>
							<span className="text">{gon.about}</span>
						</li>
						<li>
							<span className="title">Favourite TV Shows:</span>
							<span className="text">{gon.fav_tv}</span>
						</li>
						<li>
							<span className="title">Favourite Music Bands / Artists:</span>
							<span className="text">{gon.fav_music}</span>
						</li>
					</ul>
					<div className="widget w-socials">
						<h6 className="title">Other Social Networks:</h6>
						<a href={gon.facebook} className="social-item bg-facebook">
							<i className="fab fa-facebook-f" aria-hidden="true"></i>
							Facebook
						</a>
						<a href={gon.twitter} className="social-item bg-twitter">
              <i className="fab fa-twitter" aria-hidden="true"></i>
							Twitter
						</a>
					</div>
				</div>
			</div>
    )
  }
}
