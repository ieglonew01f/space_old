import React from "react";
import ReactDOM from "react-dom";

export default class SongDedications extends React.Component {
  render() {
    const { dedications } = this.props;

    return(
      <div className={window.current_user.id == gon.id ? "ui-block song-dedication-ui" : "ui-block song-dedication-ui hidden"}>
        <div className="ui-block-title">
        	<h6 className="title">Dedicated to you</h6>
    			<span className="c-green">
    				<svg className="/olymp-remove-playlist-icon">
              <use xlinkHref="/svg-icons/sprites/icons.svg#olymp-remove-playlist-icon"></use>
            </svg>
    			</span>
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
    )
  }
}
