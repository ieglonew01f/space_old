import React from "react";
import ReactDOM from "react-dom";

export default class SearchComponent extends React.Component {
  render() {
    return (
      <form className="search-bar w-search notification-list friend-requests">
        <div className="form-group with-button">
          <input className="form-control js-user-search" placeholder="Search for people ..." type="text"/>
          <button>
            <svg className="olymp-magnifying-glass-icon">
              <use xlinkHref="/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use>
            </svg>
          </button>
        </div>
      </form>
    );
  }
}
