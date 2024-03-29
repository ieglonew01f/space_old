import React from "react";
import ReactDOM from "react-dom";

import ActiveLoader from "./ActiveLoader";

export default class ActivityFeed extends React.Component {
  render() {
    const { activities } = this.props;

    var elem = null

    if (activities && activities.length != 0) {
      elem = <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Activity Feed</h6>
        </div>
        <ul className="widget w-activity-feed notification-list">
          {
            activities.map((activity, i) =>
              <li key={i}>
                <div className="author-thumb">
                  <img src={(activity.activity_owner.profile_picture) ? activity.activity_owner.profile_picture.thumb.url : "/avatars/default.png"} alt="author"/>
                </div>
                <div className="notification-event">
                  <a href={"/profile/" + activity.activity_owner.username} className="h6 notification-friend">{activity.activity_owner.first_name} {activity.activity_owner.last_name}</a> {activity.message} <a href={"/posts/" + activity.object_id} className="notification-link">{activity.object_type}</a>.
                  <span className="notification-date"><time className="entry-date updated">{activity.timestamp}</time></span>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    }

    return(
      <div>
        <ActiveLoader object={activities} type="side-widget"/>
        {elem}
      </div>
    )
  }
}
