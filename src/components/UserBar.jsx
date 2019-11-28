import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "@reach/router";

const UserBar = props => {
  const user = useContext(UserContext);
  return (
    <div className="userBar">
      <div className="userBarData">
        {user.loggedIn && <p>Logged in as: {user.name}</p>}
        {!user.loggedIn && <p>Please Log In</p>}
      </div>
      <div className="userBarButtons">
        {!user.loggedIn && (
          <Link to="/login">
            <button>Log In</button>
          </Link>
        )}
        {user.loggedIn && (
          <Link to={`/users/${user.name}`}>
            <button>My User Page</button>
          </Link>
        )}
        {user.loggedIn && <button onClick={props.logOut}>Log Out</button>}
      </div>
    </div>
  );
};

export default UserBar;
