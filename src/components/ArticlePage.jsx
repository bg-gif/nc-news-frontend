import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";

class ArticlePage extends Component {
  state = { article: [], comments: [] };
  componentDidMount() {
    Promise.all([
      api.fetchArticleById(this.props.article_id),
      api.fetchCommentsByArticleId(this.props.article_id)
    ]).then(response => {
      this.setState({ article: response[0], comments: response[1] });
    });
  }
  render() {
    const { article, comments } = this.state;
    return (
      <article>
        <header>
          <h2>{article.title}</h2>
        </header>
        <p>{article.body}</p>
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} />;
        })}
      </article>
    );
  }
}

export default ArticlePage;
