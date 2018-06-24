import React from 'react';

export default class LoadMoreButton extends React.Component {
  render() {
    return (
      <a id="load-more-button" href="#" className="btn btn-control btn-more">
        <svg className="olymp-three-dots-icon">
          <use xlinkHref="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
        </svg>
      </a>
    );
  }
}
