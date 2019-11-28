import React, { Component } from "react";
import * as api from "../utils/api";
import UserCard from "./UserCard";
import ArticleCard from "./ArticleCard";
class UserPage extends Component {
  state = { user: [], comments: [], articles: [], articlesToggle: false };
  componentDidMount = () => {
    Promise.all([
      api.fetchUserByUserName(this.props.username),
      api.fetchAllArticles({ author: this.props.username })
    ]).then(([user, articles]) => {
      this.setState({ user, articles });
    });
  };
  handleToggle = event => {
    this.setState(currentState => {
      return { articlesToggle: !currentState.articlesToggle };
    });
  };
  render() {
    const { user, articles, articlesToggle } = this.state;
    return (
      <div>
        <UserCard {...user} />
        <div className="articles">
          <h2>Articles posted by {user.username}</h2>
          <button onClick={this.handleToggle} id="articlesToggle">
            Show/Hide
          </button>
          {articlesToggle &&
            articles.map(article => {
              return <ArticleCard key={article.article_id} {...article} />;
            })}
        </div>
      </div>
    );
  }
}

export default UserPage;
