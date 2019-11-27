import React, { Component } from "react";
import * as api from "../utils/api";
import ArticleCard from "./ArticleCard";
import Loader from "./Loader";
import AddArticle from "./AddArticle";
import UserContext from "../UserContext";

class AllArticles extends Component {
  static contextType = UserContext;
  state = {
    articles: [],
    sort_by: "created_at",
    order: "desc",
    isLoading: true,
    toggle: false
  };
  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic_slug !== this.props.topic_slug) this.getArticles();
    if (prevState.sort_by !== this.state.sort_by) this.getArticles();
    if (prevState.order !== this.state.order) this.getArticles();
  }

  getArticles = () => {
    api
      .fetchAllArticles(
        this.props.topic_slug,
        this.state.sort_by,
        this.state.order
      )
      .then(articles => {
        this.setState({ articles, isLoading: false, user: this.context.name });
      });
  };

  handleSort = event => {
    event.preventDefault();
    const sort_by = event.target.value;
    this.setState({ sort_by });
  };
  handleOrder = event => {
    event.preventDefault();
    const order = event.target.value;
    this.setState({ order });
  };
  handleToggle = event => {
    this.setState(currentState => {
      return { toggle: !currentState.toggle };
    });
  };
  updateArticles = article => {
    this.setState(currentState => {
      return { articles: [article, ...currentState.articles] };
    });
  };
  render() {
    console.log(this.props, "props");
    const { articles, isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div>
        <div className="options">
          <div className="sortby">
            Sort By:{"  "}
            <select onClick={this.handleSort}>
              <option value="created_at">Date Posted</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Number of Comments</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div className="order">
            Order By:{"  "}
            <select onClick={this.handleOrder}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>{" "}
            </select>
          </div>
          <button onClick={this.handleToggle}>Add Article</button>
        </div>
        <main>
          {this.state.toggle && (
            <AddArticle
              user={this.props.user}
              updateArticles={this.updateArticles}
            />
          )}
          {articles.map(article => {
            return <ArticleCard key={article.article_id} {...article} />;
          })}
        </main>
      </div>
    );
  }
}

export default AllArticles;
