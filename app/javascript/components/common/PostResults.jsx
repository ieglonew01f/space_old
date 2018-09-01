//Base
import React from "react";
import ReactDOM from "react-dom";

//Functionals
import { connect } from "react-redux";

//UI
import Posts from "./Posts";

@connect((store) => {
  return {
    posts: [gon.post]
  };
})

export default class PostResults extends React.Component {
  constructor(props) {
    super(props);

    //this default state
    this.state = {
      post: [gon.post]
    }
  }

  componentDidMount() {

  }

  render() {
    const { posts } = this.props;

    return (
      <div className="row">
        <div className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
          <Posts posts={posts} />
        </div>
      </div>
    );
  }
}
