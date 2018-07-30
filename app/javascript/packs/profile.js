import React from 'react';
import { render } from 'react-dom';
import ProfileComponent from '../components/ProfileComponent';

import { Provider } from "react-redux"
import store from "./store"

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
       <ProfileComponent/>
    </Provider>, document.getElementById('container'));
});
