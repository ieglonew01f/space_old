import React from 'react';
import { render } from 'react-dom';
import SearchComponent from '../components/common/SearchComponent';

import { Provider } from "react-redux"
import store from "./store"

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
       <SearchComponent/>
    </Provider>, document.getElementById('search-bar')
  );
});
