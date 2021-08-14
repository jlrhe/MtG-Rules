/*
TODO: 
  error handling (when fetch fails at the very least)
  event handlers for Contents
  filter with search
  Usability (collapsing sections in toc, next/previous chapter buttons)
  possibility to show all rules at the same time and search them
  first styling pass (at least a dark mode)
  Extra features (hyperlink when a rule references another, possibility for user to select alternative file by URL)
  optimize parser and make it more robust so there's maybe a possibility of reading a different txt file...
*/
import React, { useEffect, useState } from "react";
import "./App.css";
import parser from "./parser/parser";
import Chapter from "./components/chapter/chapter.component";
import TableOfContents from "./components/table-of-contents/table-of-contents.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [rules, setRules] = useState("");
  const [selectedSection, setSelectedSection] = useState("1."); //separate from selectedChapter to allow dynamic Contents view
  const [selectedChapter, setSelectedChapter] = useState("100.");
  const [selectedChapterData, setSelectedChapterData] = useState({
    id: "100.",
    rules: [{ id: "100.1.", rule: "Loading Rules..." }],
  });
  //cors proxy is fine for fetching static data without credentials
  /* const [rulesUrl, setRulesUrl] = useState(
    "https://thingproxy.freeboard.io/fetch/https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  ); */
  const rulesUrl =
    "https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt";
  //placeholder object needed, because I anticipate fetching and parsing the rules to potentially take a few seconds
  const [parsedRules, setParsedRules] = useState([
    {
      id: "1.",
      chapters: [
        { id: "100.", rules: [{ id: "100.1.", rule: "Loading Rules..." }] },
      ],
    },
  ]);
  const updateSection = (section) => {
    setSelectedSection(section);
  };
  const updateChapter = (chapter) => {
    setSelectedChapter(chapter);
  };
  //fetch rules. Remember to add error handling at some point
  useEffect(() => {
    fetch(rulesUrl)
      .then((response) => {
        return response.text();
      })
      .then((textString) => {
        setRules(textString);
      });
  }, [rulesUrl]);
  //parse the rules
  useEffect(() => {
    setParsedRules(parser(rules));
  }, [rules]);
  //set what is shown in main view. Requires that parsedRules exists and has correct data structure. Remember to add error handling at some point
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
      <section>
        Under development, search and table of components non-functional. That
        means there's no way to cyrrently see any other rules than chapter 100.,
        but please come back tomorrow.
      </section>
      <SearchBox placeholder="Search" />
      <div className="container">
        <Chapter
          id={selectedChapterData.id}
          title={selectedChapterData.title}
          rules={selectedChapterData.rules}
        />
        <TableOfContents
          parsedRules={parsedRules}
          changeSection={updateSection}
          changeChapter={updateChapter}
        />
      </div>
    </div>
  );
};

export default App;
