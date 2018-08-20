import React from "react";
import ReactDOM from "react-dom";

export default class ActiveLoader extends React.Component {
  render() {
    const { object, type } = this.props;

    var loader = null;

    if ((object == null && type != "posts") || (object.length == 0 && type == "posts")) {
      switch (type) {
        case "posts":
          loader = <div className="ph-item">
            <div className="ph-col-2">
              <div className="ph-avatar"></div>
            </div>
            <div>
              <div className="ph-row">
                <div className="ph-col-4"></div>
                <div className="ph-col-8 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
                <div className="ph-col-2"></div>
                <div className="ph-col-10 empty"></div>
              </div>
            </div>
            <div className="ph-col-12">
              <div className="ph-picture"></div>
              <div className="ph-row">
                <div className="ph-col-10 big"></div>
                <div className="ph-col-2 empty big"></div>
                <div className="ph-col-4"></div>
                <div className="ph-col-8 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
                <div className="ph-col-12"></div>
              </div>
            </div>
          </div>
          break;
        case "side-widget":
          loader = <div className="ph-item">
            <div className="ph-col-12">
              <div className="ph-row">
                <div className="ph-col-8"></div>
                <div className="ph-col-4 empty"></div>
                <div className="ph-col-4"></div>
                <div className="ph-col-8 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
                <div className="ph-col-8"></div>
                <div className="ph-col-4 empty"></div>
                <div className="ph-col-8"></div>
                <div className="ph-col-4 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
              </div>
            </div>
          </div>
          break;
        case "left-sm":
          loader = <div className="ph-item left-sm">
            <div className="ph-col-12">
              <div className="ph-row">
                <div className="ph-col-8"></div>
                <div className="ph-col-4 empty"></div>
                <div className="ph-col-4"></div>
                <div className="ph-col-8 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
                <div className="ph-col-8"></div>
                <div className="ph-col-4 empty"></div>
                <div className="ph-col-8"></div>
                <div className="ph-col-4 empty"></div>
                <div className="ph-col-6"></div>
                <div className="ph-col-6 empty"></div>
              </div>
            </div>
          </div>
          break;
        default:

      }
    }

    return (
      loader
    );
  }

}
