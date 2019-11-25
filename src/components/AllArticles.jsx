import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";

class AllArticles extends Component {
  state = { articles: [] };
  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic_slug !== this.props.topic_slug) this.getArticles();
  }

  getArticles = () => {
    api.fetchAllArticles(this.props.topic_slug).then(articles => {
      this.setState({ articles });
    });
  };
  render() {
    const { articles } = this.state;
    return (
      <main>
        {articles.map(article => {
          return <ArticleCard key={article.article_id} {...article} />;
        })}
      </main>
    );
  }
}

export default AllArticles;
