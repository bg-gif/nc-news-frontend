import React, { Component } from "react";
import Votes from "./Votes";
import UserContext from "../UserContext";
import * as api from "../utils/api";
import EditComment from "./EditComment";
import { Link } from "@reach/router";

class CommentCard extends Component {
  static contextType = UserContext;
  state = {
    deleted: false,
    editToggle: false,
    comment: {},
    deleteDisabled: false
  };
  handleEdit = () => {
    this.setState(currentState => {
      return { editToggle: !currentState.editToggle };
    });
  };
  postEdit = comment => {
    this.setState({ comment: comment, editToggle: false });
  };
  componentDidMount() {
    this.setState({
      comment: {
        author: this.props.author,
        body: this.props.body,
        comment_id: this.props.comment_id,
        article_id: this.props.article_id
      }
    });
  }

  render() {
    const { editToggle, comment, deleteDisabled, deleted } = this.state;
    if (deleted)
      return (
        <div className="cardHolderConfirm">
          <div className="confirmation">Comment Deleted</div>
        </div>
      );
    if (editToggle)
      return (
        <div className="cardHolder">
          <EditComment
            body={comment.body}
            id={comment.comment_id}
            type="comments"
            updateComments={this.props.updateComments}
            postEdit={this.postEdit}
          />
        </div>
      );

    return (
      <div className="card">
        <header>
          <Link to={`/articles/${comment.article_id}`}>
            {" "}
            <h5>{comment.author}</h5>
          </Link>
        </header>

        <div className="cardData">
          <p> {comment.body}</p>
        </div>
        <div className="cardButtons">
          {this.context.name === comment.author && (
            <button
              onClick={() => {
                this.setState({ deleteDisabled: true });
                api.delete("comments", comment.comment_id).then(() => {
                  this.setState({ deleted: true });
                });
              }}
              disabled={deleteDisabled}
            >
              Delete Comment
            </button>
          )}
          {this.context.name === this.props.author && (
            <button onClick={this.handleEdit} id="editToggle">
              Edit Comment
            </button>
          )}
        </div>

        <Votes
          id={this.props.comment_id}
          type="comments"
          votes={this.props.votes}
        />
      </div>
    );
  }
}

export default CommentCard;
