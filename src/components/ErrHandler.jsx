import React from "react";

const ErrHandler = props => {
  console.log(props.err);
  return (
    <div className="errHandler">
      <h1>{props.err[1]}</h1>
      <h2>{props.err[0]}</h2>
    </div>
  );
};

export default ErrHandler;
