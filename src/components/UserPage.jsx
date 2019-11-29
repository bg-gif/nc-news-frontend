import React, { Component } from "react";
import * as api from "../utils/api";
import UserCard from "./UserCard";
import ArticleCard from "./ArticleCard";
import CommentCard from "./CommentCard";
import ErrHandler from "./ErrHandler";
class UserPage extends Component {
  state = {
    user: [],
    comments: [],
    articles: [],
    articlesToggle: false,
    commentsToggle: false,
    err: ""
  };
  componentDidMount = () => {
    Promise.all([
      api.fetchUserByUserName(this.props.username),
      api.fetchAllArticles({ author: this.props.username }),
      api.fetchCommentsByUserId(this.props.username)
    ])
      .then(([user, articles, comments]) => {
        this.setState({ user, articles, comments });
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const { status } = response;

        this.setState({
          err: [msg, status],
          isLoading: false
        });
      });
  };
  handleToggle = ({ target: { id } }) => {
    this.setState(currentState => {
      return { [id]: !currentState[id] };
    });
  };
  render() {
    const {
      user,
      articles,
      comments,
      articlesToggle,
      commentsToggle,
      err
    } = this.state;
    if (err) return <ErrHandler err={err} />;
    return (
      <div className="cardHolder">
        <UserCard {...user} />
        <div className="cardHolder">
          <div className="articles">
            <h2>Articles posted by {user.username}</h2>
            <button onClick={this.handleToggle} id="articlesToggle">
              Show/Hide Articles
            </button>

            {articlesToggle &&
              articles.map(article => {
                return <ArticleCard key={article.article_id} {...article} />;
              })}
          </div>
        </div>

        <div className="cardHolder">
          <div className="comments">
            <h2>Comments posted by {user.username}</h2>
            <button onClick={this.handleToggle} id="commentsToggle">
              Show/Hide Comments
            </button>
            {commentsToggle &&
              comments.map(comment => {
                return <CommentCard key={comment.comment_id} {...comment} />;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
