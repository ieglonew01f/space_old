//Base
import React from "react";
import ReactDOM from "react-dom";

export default class BannerComponent extends React.Component {
  render() {
    const {  } = this.props;

    return (
  			<div className="ui-block">
  				<div className="top-header">
  					<div className="top-header-thumb">
  						<img src="/img/top-header1.jpg" alt="nature"/>
  					</div>
  					<div className="profile-section">
  						<div className="row">
  							<div className="col col-lg-5 col-md-5 col-sm-12 col-12">
  								<ul className="profile-menu">
  									<li>
  										<a href="02-ProfilePage.html" className="active">Timeline</a>
  									</li>
  									<li>
  										<a href="05-ProfilePage-About.html">About</a>
  									</li>
  									<li>
  										<a href="06-ProfilePage.html">Friends</a>
  									</li>
  								</ul>
  							</div>
  							<div className="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
  								<ul className="profile-menu">
  									<li>
  										<a href="07-ProfilePage-Photos.html">Photos</a>
  									</li>
  									<li>
  										<a href="09-ProfilePage-Videos.html">Videos</a>
  									</li>
  									<li>
  										<div className="more">
  											<svg className="olymp-three-dots-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
  											<ul className="more-dropdown more-with-triangle">
  												<li>
  													<a href="#">Report Profile</a>
  												</li>
  												<li>
  													<a href="#">Block Profile</a>
  												</li>
  											</ul>
  										</div>
  									</li>
  								</ul>
  							</div>
  						</div>

  						<div className="control-block-button">
  							<a href="35-YourAccount-FriendsRequests.html" className="btn btn-control bg-blue">
  								<svg className="olymp-happy-face-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
  							</a>

  							<a href="#" className="btn btn-control bg-purple">
  								<svg className="olymp-chat---messages-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
  							</a>

  							<div className="btn btn-control bg-primary more">
  								<svg className="olymp-settings-icon"><use xlinkHref="/svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>

  								<ul className="more-dropdown more-with-triangle triangle-bottom-right">
  									<li>
  										<a href="#" data-toggle="modal" data-target="#update-header-photo">Update Profile Photo</a>
  									</li>
  									<li>
  										<a href="#" data-toggle="modal" data-target="#update-header-photo">Update Header Photo</a>
  									</li>
  									<li>
  										<a href="29-YourAccount-AccountSettings.html">Account Settings</a>
  									</li>
  								</ul>
  							</div>
  						</div>
  					</div>
  					<div className="top-header-author">
  						<a href="02-ProfilePage.html" className="author-thumb">
  							<img src={gon.profile_picture} alt="author"/>
  						</a>
  						<div className="author-content">
  							<a href="02-ProfilePage.html" className="h4 author-name">{gon.first_name} {gon.last_name}</a>
  							<div className="country">{gon.location}</div>
  						</div>
  					</div>
  				</div>
  			</div>
    )
  }
}
