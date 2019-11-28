import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";

class AddComment extends Component {
  static contextType = UserContext;
  state = { description: "", slug: "", err: "" };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value }, () => {
      console.log(this.state);
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { description, slug } = this.state;
    api
      .postTopic(slug, description)
      .then(topic => {
        this.setState({ description: "", slug: "" }, () => {
          this.props.updateTopics(topic);
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  };

  render() {
    const { err } = this.state;
    if (err) return <ErrHandler />;
    return (
      <div className="formContainer">
        <h3>Add Topic</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Topic:</label>
            </div>
            <div className="col-75">
              <textarea
                name="topic_slug"
                id="slug"
                placeholder="Topic Name"
                onChange={this.handleChange}
                value={this.state.slug}
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
                placeholder="Topic Description"
                onChange={this.handleChange}
                value={this.state.description}
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
