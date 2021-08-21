import React from "react";
import Rule from "../rule/rule.component";
import "./chapter.styles.css";

const Chapter = ({ id, title, sectionTitle, rules, searchString }) => {
  const filteredRules = rules.filter((rule) =>
    rule.rule.toLowerCase().includes(searchString.toLowerCase())
  );
  return (
    <section className="chapter">
      <h2>{sectionTitle}</h2>
      <h3>{id + ". " + title}</h3>
      {filteredRules.map(({ id, rule, example }) => (
        <Rule
          key={id}
          id={id}
          rule={rule}
          example={example}
          searchString={searchString}
        />
      ))}
    </section>
  );
};

export default Chapter;
