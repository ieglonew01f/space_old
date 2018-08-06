import React from 'react';
import { render } from 'react-dom';
import HomeComponent from '../components/HomeComponent';

import { Provider } from "react-redux"
import store from "./store"

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
       <HomeComponent/>
    </Provider>, document.getElementById('container')
  );
});
