import React from "react";
import { Link } from "@reach/router";

const Header = props => {
  return (
    <header>
      <img
        src="https://northcoders.com/images/logos/learn_to_code_manchester_rw_second.png"
        alt="Northcoders Logo"
      />
      <h1>
        <Link to="/">Northcoders News</Link>
      </h1>
    </header>
  );
};

export default Header;
