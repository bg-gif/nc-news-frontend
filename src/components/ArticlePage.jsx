import React, { Component } from "react";
import * as api from "../utils/api";
import CommentCard from "./CommentCard";
import Votes from "./Votes";
import Loader from "./Loader";
import AddComment from "./AddComment";
import UserContext from "../UserContext";

class ArticlePage extends Component {
  static contextType = UserContext;
  state = {
    article: [],
    comments: [],
    isLoading: true,
    user: this.context.name,
    deleted: false
  };
  componentDidMount() {
    Promise.all([
      api.fetchArticleById(this.props.article_id),
      api.fetchCommentsByArticleId(this.props.article_id)
    ]).then(response => {
      this.setState({
        article: response[0],
        comments: response[1],
        isLoading: false,
        toggle: false
      });
    });
  }
  handleToggle = event => {
    this.setState(currentState => {
      return { toggle: !currentState.toggle };
    });
  };
  updateComments = comment => {
    this.setState(currentState => {
      return { comments: [comment, ...currentState.comments] };
    });
  };
  render() {
    const { article, comments } = this.state;
    if (this.state.isLoading) return <Loader />;
    if (this.state.deleted)
      return <div className="deleted">Article Deleted</div>;
    return (
      <article>
        <header>
          <h2>{article.title}</h2>
        </header>
        <p>{article.body}</p>
        <Votes id={article.article_id} type="article" votes={article.votes} />
        <button onClick={this.handleToggle}>Add Comment</button>

        {this.state.user === article.author && (
          <button
            onClick={() => {
              api.delete("articles", article.article_id).then(() => {
                this.setState({ deleted: true });
              });
            }}
          >
            Delete Article
          </button>
        )}

        {this.state.toggle && (
          <AddComment
            user={this.props.user}
            article_id={this.props.article_id}
            updateComments={this.updateComments}
          />
        )}
        {comments.map(comment => {
          return <CommentCard key={comment.comment_id} {...comment} />;
        })}
      </article>
    );
  }
}

export default ArticlePage;
