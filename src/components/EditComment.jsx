import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";

class EditComment extends Component {
  static contextType = UserContext;
  state = { body: "", err: "" };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { body } = this.state;
    const { id, type } = this.props;
    api
      .changeVotes({ id, body, type })
      .then(comment => {
        this.setState({ body: "" });
        this.props.postEdit(comment);
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.setState({ body: this.props.body });
  }

  render() {
    const { err } = this.state;
    if (err) return <ErrHandler />;
    return (
      <div className="formContainer">
        <h3>Edit Comment</h3>
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

export default EditComment;
