import React from "react";
import Collapsible from "react-collapsible";
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
      <Collapsible
        trigger="Contents"
        classParentString="Contents"
        openedClassName="open"
        transitionTime="200"
        open="true"
      >
        <span className="material-icons contents-dropdown-icon">
          arrow_drop_down
        </span>
        {parsedRules.map(({ id, title, chapters }) => (
          <Section
            key={id}
            id={id}
            title={title}
            chapters={chapters}
            chapterChange={handleChapterChange}
          />
        ))}
      </Collapsible>
    </div>
  );
};

export default TableOfContents;
