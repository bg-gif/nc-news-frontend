import React, { Component } from "react";
import Votes from "./Votes";
import UserContext from "../UserContext";
import * as api from "../utils/api";

class CommentCard extends Component {
  static contextType = UserContext;
  state = { deleted: false };

  render() {
    if (this.state.deleted)
      return <div className="confirmation">Comment Deleted</div>;
    return (
      <div className="card">
        <header>
          <h5>{this.props.author}</h5>
        </header>
        <div className="cardData">
          <p> {this.props.body}</p>

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
