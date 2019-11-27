import React, { useContext } from "react";
import { Link } from "@reach/router";
import UserContext from "../UserContext";

const Header = () => {
  const user = useContext(UserContext);
  return (
    <header>
      <h1>
        <Link to="/">t'Reddit!</Link>
      </h1>
      <p>Logged in as: {user.name}</p>
    </header>
  );
};

export default Header;
