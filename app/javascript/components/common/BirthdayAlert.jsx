import React from "react";
import ReactDOM from "react-dom";

export default class BirthdayAlert extends React.Component {
  render() {
    return(
      <div className="ui-block">
        <div className="widget w-birthday-alert">
        	<div className="icons-block">
        		<svg className="olymp-cupcake-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-cupcake-icon"></use></svg>
        	</div>
        	<div className="content">
        		<div className="author-thumb">
        			<img src="/img/avatar48-sm.jpg" alt="author"/>
        		</div>
        		<span>Today is</span>
        		<a href="#" className="h4 title">Marina Valentine’s Birthday!</a>
        		<p>Leave her a message with your best wishes on her profile page!</p>
        	</div>
        </div>
      </div>
    )
  }
}
