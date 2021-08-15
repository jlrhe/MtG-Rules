import React from "react";
import Section from "../section/section.component";
import "./table-of-contents.styles.css";

const TableOfContents = ({
  parsedRules,
  sectionChange,
  chapterChange,
  nextChapter,
}) => {
  const handleNextChapter = () => {
    nextChapter();
  };
  return (
    <div className="table-of-contents">
      <h2>Contents</h2>
      <button onClick={handleNextChapter}>Next Chapter =&gt;</button>
      {parsedRules.map(({ id, title, chapters }) => (
        <Section key={id} id={id} title={title} chapters={chapters} />
      ))}
    </div>
  );
};

export default TableOfContents;
