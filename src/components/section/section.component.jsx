import React from "react";
import ChapterSelector from "../chapter-selector/chapter-selector.component";

const Section = ({ id, title, chapters, chapterChange }) => {
  const handleChapterChange = (chapter) => {
    chapterChange(chapter);
  };
  return (
    <section>
      <h3>{id + ". " + title}</h3>
      {chapters.map(({ id, title, rules }) => (
        <ChapterSelector
          chapterChange={handleChapterChange}
          key={id}
          id={id}
          title={title}
        />
      ))}
    </section>
  );
};

export default Section;
