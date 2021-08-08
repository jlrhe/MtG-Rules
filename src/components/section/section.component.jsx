import React from "react";
import ChapterSelector from "../chapter-selector/chapter-selector.component";

const Section = ({ id, title, chapters }) => {
  return (
    <section>
      <h3>{id + " " + title}</h3>
      {chapters.map(({ id, title, rules }) => (
        <ChapterSelector key={id} id={id} title={title} />
      ))}
    </section>
  );
};

export default Section;
