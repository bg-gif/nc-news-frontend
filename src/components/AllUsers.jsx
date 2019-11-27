import React, { Component } from "react";
import * as api from "../utils/api";
import UserCard from "./UserCard";
import Loader from "./Loader";

class AllUsers extends Component {
  state = { users: [], isLoading: true };
  componentDidMount() {
    api.fetchAllUsers().then(users => {
      this.setState({ users, isLoading: false });
    });
  }
  render() {
    const { users } = this.state;
    if (this.state.isLoading) return <Loader />;
    return (
      <div>
        {users.map(user => {
          return <UserCard {...user} key={user.username} />;
        })}
      </div>
    );
  }
}

export default AllUsers;
