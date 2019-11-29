import React, { Component } from "react";
import Votes from "./Votes";
import UserContext from "../UserContext";
import * as api from "../utils/api";
import EditComment from "./EditComment";
import { Link } from "@reach/router";

class CommentCard extends Component {
  static contextType = UserContext;
  state = { deleted: false, editToggle: false, comment: {} };
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
    const { editToggle, comment } = this.state;
    if (this.state.deleted)
      return <div className="confirmation">Comment Deleted</div>;
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
          {this.context.name === comment.author && (
            <button
              onClick={() => {
                api.delete("comments", comment.comment_id).then(() => {
                  this.setState({ deleted: true });
                });
              }}
            >
              Delete Comment
            </button>
          )}
          {this.context.name === this.props.author && (
            <button onClick={this.handleEdit} id="editToggle">
              Edit Comment
            </button>
          )}
          <div className="editForm">
            {editToggle && (
              <EditComment
                body={comment.body}
                id={comment.comment_id}
                type="comments"
                updateComments={this.props.updateComments}
                postEdit={this.postEdit}
              />
            )}
          </div>
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
