import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux"
import store from "./store"

import PostResults from "../components/common/PostResults";

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <PostResults/>
    </Provider>, document.getElementById('container')
  );
});
