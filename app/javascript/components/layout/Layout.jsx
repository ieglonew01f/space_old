import React from 'react';
import { render } from 'react-dom';

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
    render() {
      return (
        <div className="container-outside">
          <Header/>
          <h5>Body</h5>
          <Footer/>
        </div>
      );
    }
  }