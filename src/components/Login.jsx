import React, { Component } from "react";
import * as api from "../utils/api";
import UserContext from "../UserContext";
import { Link } from "@reach/router";
import ErrHandler from "./ErrHandler";
import AddUser from "./AddUser";

class Login extends Component {
  static contextType = UserContext;
  state = {
    users: [],
    user: "",
    err: "",
    isLoading: true,
    toggle: false,
    added: false
  };
  componentDidMount() {
    api
      .fetchAllUsers()
      .then(users => {
        this.setState({ users, user: users[0].username, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  }
  handleChange = ({ target }) => {
    this.setState({ user: target.value });
  };
  handleClick = () => {
    this.setState(currentState => ({ toggle: !currentState.toggle }));
  };
  updateUsers = user => {
    this.setState(currentState => {
      return {
        users: [user, ...currentState.users],
        toggle: !currentState.toggle,
        added: true
      };
    });
  };

  render() {
    const { users, user, err } = this.state;
    if (err) return <ErrHandler />;
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
          <div>
            <Link to="/">
              <button onClick={this.props.logIn} value={user}>
                Log In
              </button>
            </Link>
          </div>
          <div>
            <button onClick={this.handleClick}>Add User</button>
          </div>
        </div>
        {this.state.toggle && <AddUser updateUsers={this.updateUsers} />}
        {this.state.added && <div className="confirmation">User Added</div>}
      </main>
    );
  }
}

export default Login;
