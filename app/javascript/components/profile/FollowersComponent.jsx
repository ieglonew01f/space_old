//Base
import React from "react";
import ReactDOM from "react-dom";

export default class FollowersComponent extends React.Component {
  render() {
    const {  followers } = this.props;

    return (
      <div className="ui-block">
				<div className="ui-block-title">
					<h6 className="title">Followers</h6>
				</div>
				<div className="ui-block-content">
					<ul className="widget w-faved-page js-zoom-gallery">
            {
              followers.map((f, i) =>
                <li>
                  <a href={"/profile/" + f.user.username} title={f.user.first_name + " " + f.user.last_name}>
                    <img src={f.user.profile_picture.thumb.url} alt="author"/>
                  </a>
                </li>
              )
            }
					</ul>
				</div>
			</div>
    )
  }
}
