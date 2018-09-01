import React from "react";
import ReactDOM from "react-dom";

import ActiveLoader from "./ActiveLoader";

export default class SongDedications extends React.Component {
  render() {
    const { dedications } = this.props;
    var elem = null;

    if (dedications && dedications.length != 0 && window.current_user.id == gon.id) {
      elem = <div className="ui-block song-dedication-ui">
        <div className="ui-block-title">
        	<h6 className="title">Dedicated to you</h6>
        </div>
        <ol className="widget w-playlist">
          {
            dedications.map((d, i) =>
            	<li key={i} className="js-open-popup" data-popup-target=".playlist-popup">
            		<div className="playlist-thumb">
            			<img src={JSON.parse(d.link_meta).best_image} alt="thumb-composition"/>
            			<div className="overlay"></div>
            			<a href={JSON.parse(d.link_meta).url} className="play-icon">
            				<svg className="olymp-music-play-icon-big">
            					<use xlinkHref="/svg-icons/sprites/icons-music.svg#olymp-music-play-icon-big"></use>
            				</svg>
            			</a>
            		</div>
            		<div className="composition">
            			<a href={JSON.parse(d.link_meta).url} className="composition-name">{JSON.parse(d.link_meta).title}</a>
            			<a href={JSON.parse(d.link_meta).url} className="composition-author">by Mukunda Gogoi</a>
            		</div>
            	</li>
            )
          }
        </ol>
      </div>
    }
    return(
      <div>
        <ActiveLoader object={dedications} type="side-widget"/>
        {elem}
      </div>
    )
  }
}
