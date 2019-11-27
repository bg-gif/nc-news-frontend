import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";

class AddComment extends Component {
  static contextType = UserContext;
  state = { body: "", user: this.context.name };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { body, user } = this.state;
    const { article_id } = this.props;
    api.postComment(article_id, user, body).then(comment => {
      this.props.updateComments(comment);
    });
  };

  render() {
    return (
      <div className="formContainer">
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Comment:</label>
            </div>
            <div className="col-75">
              <textarea
                name="comment-body"
                id="body"
                placeholder="Write your comment here..."
                rows="7"
                onChange={this.handleChange}
                value={this.state.body}
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddComment;
