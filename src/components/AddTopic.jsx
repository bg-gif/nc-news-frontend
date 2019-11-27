import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";

class AddComment extends Component {
  static contextType = UserContext;
  state = { description: "", slug: "" };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { description, slug } = this.state;
    api.postTopic(slug, description).then(topic => {
      this.props.updateTopic(topic);
      this.setState({ body: "" });
    });
  };

  render() {
    return (
      <div className="formContainer">
        <h3>Add Comment</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Topic:</label>
            </div>
            <div className="col-75">
              <textarea
                name="topic_slug"
                id="slug"
                placeholder="Write your comment here..."
                rows="7"
                onChange={this.handleChange}
                value={this.state.body}
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Description:</label>
            </div>
            <div className="col-75">
              <textarea
                name="comment-description"
                id="description"
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
