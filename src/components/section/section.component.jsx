import React from "react";
import ChapterSelector from "../chapter-selector/chapter-selector.component";
import "./section.styles.css";
import Collapsible from "react-collapsible";

const Section = ({ id, title, chapters, chapterChange }) => {
  return (
    <section className="section">
      <Collapsible
        className="closed"
        openedClassName="open"
        trigger={id + ". " + title}
        transitionTime="200"
      >
        <span className="material-icons section-dropdown-icon">
          arrow_drop_down
        </span>
        {chapters.map(({ id, title }) => (
          <ChapterSelector
            chapterChange={chapterChange}
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
