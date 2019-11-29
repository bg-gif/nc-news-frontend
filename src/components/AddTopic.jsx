import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";
import Loader from "./Loader";

class AddComment extends Component {
  static contextType = UserContext;
  state = { description: "", slug: "", err: "", isLoading: false };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { description, slug } = this.state;
    api
      .postTopic(slug, description)
      .then(topic => {
        this.setState({ description: "", slug: "", isLoading: false }, () => {
          this.props.updateTopics(topic);
        });
      })
      .catch(({ response }) => {
        const { msg } = response.data;
        const { status } = response;

        this.setState(
          {
            err: [msg, status],
            isLoading: false
          },
          () => {
            console.log(this.state);
          }
        );
      });
  };

  render() {
    const { err, isLoading } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrHandler err={err} />;
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
