import React from "react";
import { Link } from "@reach/router";
// import Votes from "./Votes";

const UserCard = ({ username, avatar_url, name }) => {
  return (
    <div className="usercard">
      <header>
        <h2>
          <Link to={`/users/${username}`}>{username}</Link>
        </h2>
      </header>
      <div className="usercardData">
        <h4>{name}</h4>
        {avatar_url && <img src={avatar_url} alt="avatar" />}
      </div>
    </div>
  );
};

export default UserCard;
