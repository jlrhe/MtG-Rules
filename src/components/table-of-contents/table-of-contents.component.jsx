import React from "react";
import Section from "../section/section.component";
import "./table-of-contents.styles.css";

const TableOfContents = ({
  parsedRules,
  sectionChange,
  chapterChange,
  nextChapter,
  previousChapter,
}) => {
  const handleChapterChange = (chapter) => {
    chapterChange(chapter);
  };
  return (
    <div className="table-of-contents">
      <h2>Contents</h2>
      {parsedRules.map(({ id, title, chapters }) => (
        <Section
          key={id}
          id={id}
          title={title}
          chapters={chapters}
          chapterChange={handleChapterChange}
        />
      ))}
    </div>
  );
};

export default TableOfContents;
