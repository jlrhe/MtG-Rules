import React from "react";
import "./rule.styles.css";

const Rule = ({ id, rule, example }) => {
  return (
    <>
      <p>{id + " " + rule}</p>
      <p className="example">{example}</p>
    </>
  );
};

export default Rule;
