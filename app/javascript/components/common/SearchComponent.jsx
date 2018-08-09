import React from "react";
import ReactDOM from "react-dom";

import SearchResults from "./SearchResults";

//Functionals
import { connect } from "react-redux";
import { fetchSearchResults } from "../../actions/pageActions";

@connect((store) => {
  return {
    results: store.results.results
  };
})

export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      results: []
    }
  }

  componentDidMount() {

  }

  performSearch(e) {
    var q = e.target.value;
    if (q.length > 2) {
      this.props.dispatch(fetchSearchResults(q));
    }
  }

  render() {
    const { results } = this.props;

    return (
      <form className="search-bar w-search notification-list friend-requests">
        <div className="form-group with-button">
          <input onChange={event => this.performSearch(event)} className="form-control js-user-search" placeholder="Search for people ..." type="text"/>
          <div className="selectize-dropdown multi form-control js-user-search">
            <div className="selectize-dropdown-content">
              <SearchResults results={results}/>
            </div>
          </div>
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
