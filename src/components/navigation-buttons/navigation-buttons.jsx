import React from "react";
import "./navigation-buttons.css";
import Button from "../button/button.component";

const NavigationButtons = ({ nextChapter, previousChapter }) => {
  const handleNextChapter = () => {
    nextChapter();
  };
  const handlePreviousChapter = () => {
    previousChapter();
  };
  return (
    <div className="container">
      <Button
        type="navigation"
        text="&lt;= Chapter"
        handleClick={handlePreviousChapter}
      />
      {/* 
      Disabled until I finally get around to writing the event handlers for these...
      <Button type="navigation" text="&lt;=&lt;= Section" />
      <Button type="navigation" text="Section=&gt;=&gt;" /> 
      */}
      <Button
        type="navigation"
        text="Chapter=&gt;"
        handleClick={handleNextChapter}
      />
    </div>
  );
};
export default NavigationButtons;
