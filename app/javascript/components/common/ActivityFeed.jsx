import React from "react";
import ReactDOM from "react-dom";

export default class ActivityFeed extends React.Component {
  render() {
    const { activities } = this.props;
    return(
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Activity Feed</h6>
        </div>
        <ul className="widget w-activity-feed notification-list">
          {
            activities.map((activity, i) =>
              <li key={i}>
                <div className="author-thumb">
                  <img src={activity.activity_owner.profile_picture.thumb.url} alt="author"/>
                </div>
                <div className="notification-event">
                  <a href="#" className="h6 notification-friend">{activity.activity_owner.first_name} {activity.activity_owner.last_name}</a> {activity.message} {activity.object_owner.first_name} {activity.object_owner.last_name}’s <a href="" className="notification-link">{activity.object_type}</a>.
                  <span className="notification-date"><time className="entry-date updated">2 mins ago</time></span>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
