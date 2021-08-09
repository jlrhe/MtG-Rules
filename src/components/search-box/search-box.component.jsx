import React from "react";
import "./search-box.styles.css";

const SearchBox = ({ placeholder, handleChange }) => (
  <div className="search-bar">
    <input
      className="search"
      type="search"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);
export default SearchBox;
