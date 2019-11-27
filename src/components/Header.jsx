import React, { useContext } from "react";
import { Link } from "@reach/router";
import UserContext from "../UserContext";

const Header = props => {
  const user = useContext(UserContext);
  return (
    <header>
      <h1>
        <Link to="/">t'Reddit!</Link>
      </h1>
      {user.loggedIn && <p>Logged in as: {user.name}</p>}
      {!user.loggedIn && <p>Please Log In</p>}
      {!user.loggedIn && (
        <Link to="/login">
          <button>Log In</button>
        </Link>
      )}
      {user.loggedIn && <button onClick={props.logOut}>Log Out</button>}
    </header>
  );
};

export default Header;
