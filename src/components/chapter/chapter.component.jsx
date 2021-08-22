import React, { useState, useEffect } from "react";
import Rule from "../rule/rule.component";
import "./chapter.styles.css";

const Chapter = ({ id, title, sectionTitle, rules, searchString }) => {
  const [filteredRules, setFilteredRules] = useState(rules);

  useEffect(() => {
    setFilteredRules(
      rules.filter((rule) =>
        rule.rule.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [rules, searchString]);

  /* rules.filter((rule) =>
    rule.rule.toLowerCase().includes(searchString.toLowerCase())
  );
  console.log(filteredRules); */
  if (id === 600) {
    return (
      <section className="chapter">
        <h2>{sectionTitle}</h2>
        <h3>{id + ". " + title}</h3>
        <p>This chapter has no rules.</p>
      </section>
    );
  } else if (Object.keys(filteredRules).length === 0) {
    return (
      <section className="chapter">
        <h2>{sectionTitle}</h2>
        <h3>{id + ". " + title}</h3>
        <p>No rules found</p>
      </section>
    );
  } else {
    return (
      <section className="chapter">
        <h2>{sectionTitle}</h2>
        <h3>{id + ". " + title}</h3>
        {filteredRules.map((rule) => (
          <Rule
            key={rule.id}
            id={rule.id}
            rule={rule.rule}
            example={rule.example}
            searchString={searchString}
          />
        ))}
      </section>
    );
  }
};

export default Chapter;
