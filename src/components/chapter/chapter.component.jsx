import React from "react";
import Rule from "../rule/rule.component";

const Chapter = ({ id, title, rules }) => {
  return (
    <section>
      <h3>{id + " " + title}</h3>
      {rules.map(({ id, rule, example }) => (
        <Rule key={id} id={id} rule={rule} example={example} />
      ))}
    </section>
  );
};

export default Chapter;
