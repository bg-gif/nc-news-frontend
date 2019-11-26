import React from "react";
import { Link } from "@reach/router";
// import Votes from "./Votes";

const UserCard = ({ username, avatar_url, name }) => {
  return (
    <div className="userCard">
      <h3>
        <Link to={`/users/${username}`}>{username}</Link>
      </h3>
      <h4>{name}</h4>
      {avatar_url && <img src={avatar_url} alt="avatar" />}
    </div>
  );
};

export default UserCard;
