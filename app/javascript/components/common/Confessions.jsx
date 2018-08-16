import React from "react";
import ReactDOM from "react-dom";

export default class Confessions extends React.Component {
  render() {
    const { confessions } = this.props;

    return(
      <div className={window.current_user.id == gon.id ? "ui-block": "ui-block hidden"}>
        <div className="ui-block-title">
          <h6 className="title">Confessions</h6>
        </div>
        <ul className="widget w-confession-feed notification-list">
          {
            confessions.map((confession, i) =>
              <li key={i}>
                <div className="notification-event">
                  <div className="post__author author vcard inline-items">
                    <img src={confession.confession_by.profile_picture.thumb.url} alt="author"/>
                    <div className="author-date">
                      <a className="h6 post__author-name fn" href={"/profile/" + confession.confession_by.username}>Mukunda Gogoi</a>
                      <div className="post__date">
                        <time className="published">{confession.timestamp}</time>
                      </div>
                    </div>
                  </div>
                  <p>
                    {confession.message.trimToLength(100)}
                    <br/>
                    <a href={"/confessions/" + confession.id} className={confession.message.length > 100 ? "" : "hidden"}>read more</a>
                  </p>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
