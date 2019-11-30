import React from "react";
import { Link } from "@reach/router";
// import Votes from "./Votes";

const UserCard = ({ username, avatar_url, name }) => {
  return (
    <div className="usercard">
      <header>
        <h2>
          <Link to={`/users/${username}`} state={{ username }}>
            {username}
          </Link>
        </h2>
      </header>
      <div className="usercardData">
        <h1>{name}</h1>

        {avatar_url && (
          <div className="usercardImageholder">
            <img src={avatar_url} alt="avatar" />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
