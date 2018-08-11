import React from "react";
import ReactDOM from "react-dom";

export default class BirthdayAlert extends React.Component {
  render() {
    const { birthdays } = this.props;

    var elem = null;

    if (birthdays) {
      elem = <div className="ui-block">
        <div className="widget w-birthday-alert">
        	<div className="icons-block">
        		<svg className="olymp-cupcake-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-cupcake-icon"></use></svg>
        	</div>
        	<div className="content">
        		<div className="author-thumb">
        			<img src={birthdays.profile_picture.thumb.url} alt="author"/>
        		</div>
        		<span>Today is</span>
        		<a href={"/profile/" + birthdays.username} className="h4 title">{birthdays.first_name + " " + birthdays.last_name + "'s"} Birthday!</a>
        		<p>Leave a message with your best wishes</p>
        	</div>
        </div>
      </div>
    }
    return(
      elem
    )
  }
}
