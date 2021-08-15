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
  const [selectedSection, setSelectedSection] = useState(1); //separate from selectedChapter to allow dynamic Contents view
  const [selectedChapter, setSelectedChapter] = useState(100);
  const [selectedChapterData, setSelectedChapterData] = useState({
    id: 100,
    title: "loading...",
    rules: [{ id: "100.1.", rule: "Loading Rules..." }],
  });
  //cors proxy is fine for fetching static data without credentials
  const [rulesUrl, setRulesUrl] = useState(
    "https://frozen-dawn-34650.herokuapp.com/media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );

  //placeholder object needed, because I anticipate fetching and parsing the rules to potentially take a few seconds
  const [parsedRules, setParsedRules] = useState([
    {
      id: 1,
      title: "loading...",
      chapters: [
        {
          id: 100,
          title: "loading...",
          rules: [{ id: "100.1.", rule: "Loading Rules..." }],
        },
      ],
    },
  ]);
  const SectionChange = (section) => {
    setSelectedSection(section);
  };
  const ChapterChange = (chapter) => {
    setSelectedChapter(chapter);
  };
  const findChapter = (
    sectionToFind = selectedSection,
    chapterToFind = selectedChapter
  ) => {
    parsedRules
      .find((section) => section.id === sectionToFind)
      .chapters.find((chapter) => chapter.id === chapterToFind);
  };
  const findSection = (sectionToFind = selectedSection) => {
    parsedRules.find((section) => section.id === sectionToFind);
  };
  const nextChapter = () => {
    if (findChapter(selectedChapter + 1) === undefined) {
      if (findSection(selectedSection + 1) === undefined) {
        //last chapter and section
        setSelectedSection(1);
        setSelectedChapter(1);
      }
      //last chapter
      else setSelectedSection(selectedSection + 1);
      setSelectedChapter(1);
    } else setSelectedChapter(selectedChapter + 1);
  };
  const handleFetchError = (response) => {
    if (!response.ok) {
      alert(
        "There was an error fetching the rules. \n Please try again when the winds of magic are more favorable."
      );
      throw Error(response.statusText);
    }
  };
  //fetch rules. Remember to add error handling at some point
  useEffect(() => {
    fetch(rulesUrl)
      .then(handleFetchError)
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
    setSelectedChapterData(findChapter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          nextChapter={nextChapter}
          sectionChange={SectionChange}
          chapterChange={ChapterChange}
        />
      </div>
    </div>
  );
};

export default App;
