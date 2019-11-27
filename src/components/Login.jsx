import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import { Link } from "@reach/router";

class Login extends Component {
  static contextType = UserContext;
  state = { users: [], user: "" };
  componentDidMount() {
    api.fetchAllUsers().then(users => {
      this.setState({ users, user: users[0].username });
    });
  }
  handleChange = ({ target }) => {
    this.setState({ user: target.value });
  };

  render() {
    const { users, user } = this.state;
    return (
      <main>
        <div>
          <h2>Welcome to t'Reddit!</h2>
          <h4>Please choose your log in</h4>
          <select onChange={this.handleChange}>
            {users.map(user => {
              return (
                <option value={user.username} key={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
          <Link to="/">
            <button onClick={this.props.logIn} value={user}>
              Log In
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

export default Login;
