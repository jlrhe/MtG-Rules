import React, { useEffect, useState } from "react";
import "./App.css";
import parser from "./parser/parser";
import Chapter from "./components/chapter/chapter.component";
import TableOfContents from "./components/table-of-contents/table-of-contents.component";
import SearchBox from "./components/search-box/search-box.component";

/*
TODO: 
  code the parser
  filter with search
  event handlers for Contents
  Usability and styling
  possibility to show all rules at the same time and search them
  Extra features (hyperlink when a rule references another, possibility for user to select alternative file by URL)
*/
const App = () => {
  const [rules, setRules] = useState("");
  const [selectedSection, setSelectedSection] = useState("1."); //separate from selectedChapter to allow dynamic Contents view
  const [selectedChapter, setSelectedChapter] = useState("100.");
  const [selectedChapterData, setSelectedChapterData] = useState({
    id: "100.",
    rules: [{ id: "100.1.", rule: "Loading Rules..." }],
  });
  //cors proxy is fine for fetching static data without credentials
  const [rulesUrl, setRulesUrl] = useState(
    "https://thingproxy.freeboard.io/fetch/https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );
  //placeholder object needed, because I anticipate fetching and parsing the rules to potentially take a few seconds
  const [parsedRules, setParsedRules] = useState([
    {
      id: "1.",
      chapters: [
        { id: "100.", rules: [{ id: "100.1.", rule: "Loading Rules..." }] },
      ],
    },
  ]);
  /* commented out to avoid fetch during development
  useEffect(() => {
    fetch(rulesUrl)
      .then((response) => {
        return response.text();
      })
      .then((textString) => {
        setRules(textString);
      });
  }, [rulesUrl]);
 */
  useEffect(() => {
    setParsedRules(parser(rules));
  }, [rules]);
  useEffect(() => {
    setSelectedChapterData(
      parsedRules
        .find((section) => section.id === selectedSection)
        .chapters.find((chapter) => chapter.id === selectedChapter)
    );
  }, [parsedRules, selectedChapter, selectedChapterData, selectedSection]);
  return (
    <div className="App">
      <header className="page-header">MtG Rules</header>
      <SearchBox placeholder="Search" />
      <div className="container">
        <Chapter
          id={selectedChapterData.id}
          title={selectedChapterData.title}
          rules={selectedChapterData.rules}
        />
        <TableOfContents parsedRules={parsedRules} />
      </div>
    </div>
  );
};

export default App;
