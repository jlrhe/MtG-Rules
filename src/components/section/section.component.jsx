import React from "react";
import ChapterSelector from "../chapter-selector/chapter-selector.component";
import "./section.styles.css";
import Collapsible from "react-collapsible";

const Section = ({ id, title, chapters, chapterChange }) => {
  const handleChapterChange = (chapter) => {
    chapterChange(chapter);
  };
  return (
    <section className="section">
      <Collapsible
        className="closed"
        openedClassName="open"
        trigger={id + ". " + title}
      >
        {chapters.map(({ id, title, rules }) => (
          <ChapterSelector
            chapterChange={handleChapterChange}
            key={id}
            id={id}
            title={title}
          />
        ))}
      </Collapsible>
    </section>
  );
};

export default Section;
