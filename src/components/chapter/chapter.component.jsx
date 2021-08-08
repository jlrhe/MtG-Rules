import React from "react";
import Rule from "../rule/rule.component";
import "./chapter.styles.css";

const Chapter = ({ id, title, rules }) => {
  return (
    <section className="chapter">
      <h3>{id + " " + title}</h3>
      {rules.map(({ id, rule, example }) => (
        <Rule key={id} id={id} rule={rule} example={example} />
      ))}
    </section>
  );
};

export default Chapter;
