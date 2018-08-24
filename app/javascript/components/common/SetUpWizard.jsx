//Base
import React from "react";
import ReactDOM from "react-dom";

export default class SetUpWizard extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {

    }
  }

  render() {
    const {  } = this.props;

    return (
      <div className="ui-block">
        <div className="ui-block-title">
          <h6 className="title">Complete your account details</h6>
        </div>
        <div className="ui-body">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-picture-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
