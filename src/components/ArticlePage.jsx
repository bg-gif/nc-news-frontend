import React, { Component } from "react";
import * as api from "../utils/api";

class ArticlePage extends Component {
  state = { article: [] };
  componentDidMount() {
    console.log(this.props);
    api.fetchArticleById(this.props.article_id).then(article => {
      console.log(article);
    });
  }
  render() {
    return <div>Article Page</div>;
  }
}

export default ArticlePage;
