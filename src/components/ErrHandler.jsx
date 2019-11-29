import React from "react";

const ErrHandler = props => {
  return (
    <div className="errHolder">
      <div className="errText">
        <h1>Ooops! Something went wrong!</h1>
        <h1>{props.err[1]}</h1>
        <h2>{props.err[0]}</h2>
      </div>
    </div>
  );
};

export default ErrHandler;
