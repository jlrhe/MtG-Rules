import React from "react";
import Rule from "../rule/rule.component";
import "./chapter.styles.css";

const Chapter = ({ id, title, rules, searchString }) => {
  const filteredRules = rules.filter((rule) =>
    rule.rule.toLowerCase().includes(searchString.toLowerCase())
  );
  return (
    <section className="chapter">
      <h3>{id + ". " + title}</h3>
      {filteredRules.map(({ id, rule, example }) => (
        <Rule key={id} id={id} rule={rule} example={example} />
      ))}
    </section>
  );
};

export default Chapter;
