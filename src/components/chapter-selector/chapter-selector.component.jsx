import React from "react";
import "./chapter-selector.styles.css";

const ChapterSelector = ({ id, title, chapterChange }) => {
  const handleClick = () => {
    chapterChange(id);
  };
  return (
    <button className="chapter-selector" onClick={handleClick}>
      {id + " " + title}
    </button>
  );
};

export default ChapterSelector;
