import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";
import Loader from "./Loader";

class AddComment extends Component {
  static contextType = UserContext;
  state = {
    body: "",
    user: this.context.name,
    err: "",
    disabled: false,
    isLoading: false
  };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { body, user } = this.state;
    const { article_id } = this.props;
    this.setState({ disabled: true, isLoading: true });
    api
      .postComment(article_id, user, body)
      .then(comment => {
        this.setState({ body: "", isLoading: false });
        this.props.updateComments(comment);
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  };

  render() {
    const { err, disabled, isLoading } = this.state;
    if (err) return <ErrHandler />;
    if (isLoading) return <Loader />;
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
            <input type="submit" value="Submit" disabled={disabled} />
          </div>
        </form>
      </div>
    );
  }
}

export default AddComment;
