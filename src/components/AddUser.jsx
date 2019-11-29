import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import ErrHandler from "./ErrHandler";

class AddUser extends Component {
  static contextType = UserContext;
  state = { username: "", avatar_url: "", name: "", err: "" };
  handleChange = ({ target }) => {
    this.setState({ [target.id]: target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { username, avatar_url, name } = this.state;
    api
      .postUser(username, avatar_url, name)
      .then(user => {
        this.setState({ username: "", avatar_url: "", name: "" }, () => {
          this.props.updateUsers(user);
        });
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  };

  render() {
    const { err } = this.state;
    if (err) return <ErrHandler err={err} />;
    return (
      <div className="formContainer">
        <h3>Add User</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Username:</label>
            </div>
            <div className="col-75">
              <textarea
                name="new_username"
                id="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username}
                rows="1"
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Avatar URL:</label>
            </div>
            <div className="col-75">
              <textarea
                name="avatar-url"
                id="avatar_url"
                placeholder="Avatar URL"
                onChange={this.handleChange}
                value={this.state.avatar_url}
                rows="1"
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Name:</label>
            </div>
            <div className="col-75">
              <textarea
                name="real-name"
                id="name"
                placeholder="Name"
                rows="1"
                onChange={this.handleChange}
                value={this.state.name}
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

export default AddUser;
