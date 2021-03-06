import React from "react";
import "./navigation-buttons.css";
import Button from "../button/button.component";

const NavigationButtons = ({
  nextChapter,
  previousChapter,
  nextSection,
  previousSection,
}) => {
  return (
    <div className="container">
      <Button
        type="navigation"
        text="&lt;= Chapter"
        handleClick={previousChapter}
      />
      <Button
        type="navigation"
        text="&lt;=&lt;= Section"
        handleClick={previousSection}
      />
      <Button
        type="navigation"
        text="Section=&gt;=&gt;"
        handleClick={nextSection}
      />

      <Button type="navigation" text="Chapter=&gt;" handleClick={nextChapter} />
    </div>
  );
};
export default NavigationButtons;
