import React from 'react';
import { render } from 'react-dom';
import LayoutComponent from '../components/Layout';

import { Provider } from "react-redux"
import store from "./store"

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
       <LayoutComponent/>
    </Provider>, document.getElementById('container'));
});
