import React from "react";
import Chapter from "../chapter/chapter.component";

const Section = ({ id, title, chapters }) => {
  return (
    <section>
      <h2>{id + " " + title}</h2>
      {chapters.map(({ id, title, rules }) => (
        <Chapter key={id} id={id} title={title} rules={rules} />
      ))}
    </section>
  );
};

export default Section;
