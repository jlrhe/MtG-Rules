import React from "react";
import Section from "../section/section.component";
import "./table-of-contents.styles.css";

const TableOfContents = ({ parsedRules }) => {
  return (
    <div className="table-of-contents">
      <h2>Contents</h2>
      {parsedRules.map(({ id, title, chapters }) => (
        <Section key={id} id={id} title={title} chapters={chapters} />
      ))}
    </div>
  );
};

export default TableOfContents;
