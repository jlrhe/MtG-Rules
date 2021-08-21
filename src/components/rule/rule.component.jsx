import React from "react";
import "./rule.styles.css";
import Highlight from "react-highlighter";

const Rule = ({ id, rule, example, searchString }) => {
  return (
    <>
      <Highlight search={searchString}>{id + " " + rule}</Highlight>
      <p className="example">{example}</p>
    </>
  );
};

export default Rule;
