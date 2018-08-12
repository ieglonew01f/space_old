//Base
import React from "react";
import ReactDOM from "react-dom";

export default class PhotosComponent extends React.Component {
  render() {
    const { photos } = this.props;

    return (
        photos.map((p, i) =>
          <div className="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
            <div className="ui-block video-item">
              <div className="video-player">
                <img src={p.post_meta.url} alt="photo"/>
              </div>
            </div>
          </div>
      )
    )
  }
}
