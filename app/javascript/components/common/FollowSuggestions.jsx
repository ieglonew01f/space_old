import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { followUser } from "../../actions/userActions";

@connect((store) => {
  return {
    suggestions: store.suggestions.suggestions
  };
})

export default class FollowSuggestions extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {

    }
  }

  follow(e, id) {
    this.props.dispatch(followUser(id));
  }

  render() {
    const { suggestions, followed } = this.props;

    return(
      <div className="ui-block">
				<div className="ui-block-title">
					<h6 className="title">Suggestions</h6>
				</div>
				<ul className="widget w-friend-pages-added notification-list friend-requests">
          {
            suggestions.map((suggestion, i) =>
    					<li key={i} className="inline-items">
    						<div className="author-thumb">
    							<img src={suggestion.profile_picture} alt="author"/>
    						</div>
    						<div className="notification-event">
    							<a href="#" className="h6 notification-friend">{suggestion.first_name} {suggestion.last_name}</a>
    							<span className="chat-message-item">{suggestion.location}</span>
    						</div>
    						<span className="notification-icon">
    							<a href="javascript:void(0)" onClick={event => this.follow(event, suggestion.id)} className="accept-request">
    								<span className="icon-add without-text">
    									<svg className="olymp-happy-face-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
    								</span>
    							</a>
    						</span>
    					</li>
            )
           }
				</ul>
			</div>
    )
  }
}
