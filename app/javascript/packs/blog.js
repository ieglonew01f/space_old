import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux"
import store from "./store"

import Blog from "../components/common/Blog";

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Blog/>
    </Provider>, document.getElementById('container')
  );
});
