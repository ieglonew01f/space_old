//Base
import React from "react";
import ReactDOM from "react-dom";

import ActiveLoader from "../common/ActiveLoader";

export default class FollowersComponent extends React.Component {
  render() {
    const { followers } = this.props;
    var elem = null;

    if (followers && followers.length != 0) {
      elem = <div className="ui-block">
				<div className="ui-block-title">
					<h6 className="title">Followers</h6>
				</div>
				<div className="ui-block-content">
					<ul className="widget w-faved-page js-zoom-gallery">
            {
              followers.map((f, i) =>
                <li key={i}>
                  <a href={"/profile/" + f.user.username} title={f.user.first_name + " " + f.user.last_name}>
                    <img src={f.user.profile_picture.thumb.url} alt="author"/>
                  </a>
                </li>
              )
            }
					</ul>
				</div>
			</div>
    }
    return (
      <div>
        <ActiveLoader object={followers} type="side-widget"/>
        {elem}
      </div>
    )
  }
}
