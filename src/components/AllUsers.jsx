import React, { Component } from "react";
import * as api from "../utils/api";
import UserCard from "./UserCard";
import Loader from "./Loader";
import ErrHandler from "./ErrHandler";

class AllUsers extends Component {
  state = { users: [], isLoading: true, err: "" };
  componentDidMount() {
    api
      .fetchAllUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({
          err: [response.data.msg, response.status],
          isLoading: false
        });
      });
  }

  render() {
    const { users, isLoading, err } = this.state;
    if (isLoading) return <Loader />;
    if (err) return <ErrHandler />;
    return (
      <div className="usersContainer">
        {users.map(user => {
          return <UserCard {...user} key={user.username} />;
        })}
      </div>
    );
  }
}

export default AllUsers;
