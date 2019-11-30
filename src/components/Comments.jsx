import React, { Component } from "react";
import * as api from "../utils/api";
import AddComment from "./AddComment";
import CommentCard from "./CommentCard";
import ErrHandler from "./ErrHandler";
import Loader from "./Loader";
import UserContext from "../UserContext";

class Comments extends Component {
  static contextType = UserContext;
  state = { comments: [], isLoading: true, toggle: false, added: false };
  componentDidMount() {
    api
      .fetchCommentsByArticleId(this.props.article_id)
      .then(comments => {
        this.setState({ comments, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
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
      return {
        comments: [comment, ...currentState.comments],
        added: !currentState.added,
        toggle: !currentState.toggle
      };
    });
  };
  render() {
    const { isLoading, err, comments } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrHandler err={err} />;
    return (
      <section>
        {this.state.toggle && (
          <AddComment
            user={this.props.user}
            article_id={this.props.article_id}
            updateComments={this.updateComments}
          />
        )}
        {this.context.name && (
          <button onClick={this.handleToggle}>Add Comment</button>
        )}
        {this.state.added && (
          <div className="cardHolder">
            <div className="confirmation">Comment Added</div>
          </div>
        )}
        {comments.map(comment => {
          return (
            <CommentCard
              key={comment.comment_id}
              {...comment}
              article_id={this.props.article_id}
            />
          );
        })}
      </section>
    );
  }
}

export default Comments;
