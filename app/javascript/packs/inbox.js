import React from 'react';
import { render } from 'react-dom';
import InboxComponent from '../components/InboxComponent';

import { Provider } from "react-redux"
import store from "./store"

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
       <InboxComponent/>
    </Provider>, document.getElementById('container')
  );
});
