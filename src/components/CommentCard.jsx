import React, { Component } from "react";
import Votes from "./Votes";
import UserContext from "../UserContext";
import * as api from "../utils/api";

class CommentCard extends Component {
  static contextType = UserContext;
  state = { deleted: false };

  render() {
    if (this.state.deleted)
      return <div className="deleted">Comment Deleted</div>;
    return (
      <div className="commentCard">
        <h5>User: {this.props.author}</h5>
        <p>Comment: {this.props.body}</p>
        <Votes
          id={this.props.comment_id}
          type="comments"
          votes={this.props.votes}
        />

        {this.context.name === this.props.author && (
          <button
            onClick={() => {
              api.delete("comments", this.props.comment_id).then(() => {
                this.setState({ deleted: true });
              });
            }}
          >
            Delete Comment
          </button>
        )}
      </div>
    );
  }
}

export default CommentCard;
