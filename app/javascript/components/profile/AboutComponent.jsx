//Base
import React from "react";
import ReactDOM from "react-dom";

export default class AboutComponent extends React.Component {
  render() {
    const {  } = this.props;

    return (
        <div className="ui-block">
  				<div className="ui-block-title">
  					<h6 className="title">Profile Intro</h6>
  				</div>
  				<div className="ui-block-content">
  					<ul className="widget w-personal-info item-block">
  						<li>
  							<span className="title">About Me:</span>
  							<span className="text">Hi, I’m James, I’m 36 and I work as a Digital Designer for the  “Daydreams” Agency in Pier 56.</span>
  						</li>
  					</ul>
  				</div>
  			</div>
    )
  }
}
