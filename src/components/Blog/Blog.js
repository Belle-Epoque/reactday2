import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { getArticles } from "../../api/api";

/**
 * Blog (await/async example).
 *
 * @param {array} articles from api.
 *
 */
class Blog extends Component {
  constructor() {
    super();
    // Init state
    this.state = {
      articles: []
    };
  }
  async componentDidMount() {
    const articles = await getArticles();
    this.setState({
      articles
    });
  }
  render() {
    console.log("DEBUG articles", this.state.articles);
    return <div>HERE my articles</div>;
  }
}
Blog.propTypes = {};

export default Blog;
