import React, { Component } from "react";
import * as api from "../utils/api";
import UserCard from "./UserCard";

class AllUsers extends Component {
  state = { users: [] };
  componentDidMount() {
    api.fetchAllUsers().then(users => {
      console.log(users);
      this.setState({ users });
    });
  }
  render() {
    const { users } = this.state;
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
