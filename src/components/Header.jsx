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
      <button onClick={props.logOut}>Change User</button>
    </header>
  );
};

export default Header;
