/*
TODO: 
  possibility to show all rules at the same time and search them
  fix parser (chapter 505 -> affects 506-514)
  second styling pass (at least a dark mode)
  Extra features (hyperlink when a rule references another, possibility for user to select alternative file by URL)
  optimize parser and make it more robust so there's maybe a possibility of reading a different txt file...
*/
import React, { useEffect, useState } from "react";
import "./App.css";
import parser from "./parser/parser";
import Chapter from "./components/chapter/chapter.component";
import TableOfContents from "./components/table-of-contents/table-of-contents.component";
import SearchBox from "./components/search-box/search-box.component";
import NavigationButtons from "./components/navigation-buttons/navigation-buttons";

const App = () => {
  const [rules, setRules] = useState("");
  const [selectedSection, setSelectedSection] = useState(1); //separate from selectedChapter to allow dynamic Contents view
  const [selectedChapter, setSelectedChapter] = useState(100);
  const [searchField, setSearchField] = useState("");
  const [selectedChapterData, setSelectedChapterData] = useState({
    id: 100,
    title: "loading...",
    rules: [{ id: "100.1.", rule: "Loading Rules..." }],
  });
  /*cors proxy is fine for fetching static data without credentials, commented out since currently there's no way for the user to change this
  const [rulesUrl, setRulesUrl] = useState(
    "https://frozen-dawn-34650.herokuapp.com/media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );*/
  const staticRulesUrl =
    "https://frozen-dawn-34650.herokuapp.com/media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt";
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

  const handleSectionChange = (section) => {
    setSelectedSection(parseInt(section));
  };

  const handleChapterChange = (chapter) => {
    if (parseInt(chapter.toString()[0]) !== selectedSection) {
      handleSectionChange(parseInt(chapter.toString()[0]));
    }
    /*     console.log("set chapter: ", selectedChapter); */
    setSelectedChapter(chapter);
  };

  const findChapter = (sectionToFind, chapterToFind) => {
    return parsedRules
      .find((section) => section.id === parseInt(sectionToFind))
      .chapters.find((chapter) => chapter.id === parseInt(chapterToFind));
  };

  const findSection = (sectionToFind = selectedSection) => {
    return parsedRules.find((section) => section.id === sectionToFind);
  };

  const nextSection = () => {
    if (findSection(selectedSection + 1) === undefined) {
      /*       console.log("last section"); */
    } else {
      setSelectedSection(selectedSection + 1);
      setSelectedChapter((selectedSection + 1) * 100);
      /*       console.log("next section"); */
    }
  };

  const previousSection = () => {
    if (selectedSection === 1) {
      /*       console.log("first section"); */
    } else {
      setSelectedSection(selectedSection - 1);
      setSelectedChapter((selectedSection - 1) * 100);
      /*       console.log("previousSection"); */
    }
  };

  const nextChapter = () => {
    if (findChapter(selectedSection, selectedChapter + 1) === undefined) {
      /*       console.log("last chapter"); */
    } else {
      /*       console.log("next chapter"); */
      setSelectedChapter(selectedChapter + 1);
    }
  };

  const previousChapter = () => {
    if (selectedChapter === selectedSection * 100) {
      /*       console.log("first chapter"); */
    } else {
      setSelectedChapter(selectedChapter - 1);
    }
  };

  const handleFetchError = (response) => {
    if (!response.ok) {
      alert(
        "There was an error fetching the rules. \n Please try again when the winds of magic are more favorable."
      );
      throw Error(response.statusText);
    }
    return response;
  };

  const handleSearchEvent = (e) => {
    setSearchField(e.target.value);
    /*     console.log(searchField); */
  };

  //fetch rules.
  useEffect(() => {
    fetch(staticRulesUrl)
      .then(handleFetchError)
      .then((response) => {
        return response.text();
      })
      .then((textString) => {
        setRules(textString);
        console.log("rules set");
      })
      .catch((error) => {
        alert(
          "There was an error fetching the rules. \n Please try again when the winds of magic are more favorable."
        );
        console.log(error);
      });
  }, [staticRulesUrl]);

  //parse the rules
  useEffect(() => {
    setParsedRules(parser(rules));
    /*     console.log("parsing rules"); */
  }, [rules]);

  //set what is shown in main view. Requires that parsedRules exists and has correct data structure. Remember to add error handling at some point
  //if statement is to ensure both section and chapter have updated.
  useEffect(() => {
    if (
      selectedSection === Math.floor(selectedChapter / 100) ||
      selectedSection === Math.floor(selectedChapter / 1000)
    )
      //checking for chapters 1000+ in case there are more than 9 chapters in the future
      setSelectedChapterData(findChapter(selectedSection, selectedChapter));
    /* console.log(
      "Chapter data updated. Chapter: ",
      selectedChapter,
      ". Section: ",
      selectedSection
    ); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedRules, selectedSection, selectedChapter]);

  return (
    <div className="App">
      <header className="page-header">MtG Rules</header>

      <SearchBox
        placeholder="Search shown rules by typing here"
        handleChange={handleSearchEvent}
      />
      <div className="main-container">
        <div className="main-view">
          <NavigationButtons
            nextChapter={nextChapter}
            previousChapter={previousChapter}
            nextSection={nextSection}
            previousSection={previousSection}
          ></NavigationButtons>
          <Chapter
            id={selectedChapterData.id}
            title={selectedChapterData.title}
            sectionTitle={findSection(selectedSection).title}
            rules={selectedChapterData.rules}
            searchString={searchField}
          />
        </div>
        <TableOfContents
          parsedRules={parsedRules}
          chapterChange={handleChapterChange}
        />
      </div>
      <p className="disclaimer">
        MtG Rules (this website) is unofficial Fan Content permitted under the
        Fan Content Policy. Not approved/endorsed by Wizards. Portions of the
        materials used are property of Wizards of the Coast. ©Wizards of the
        Coast LLC. <br /> The rules are from:{" "}
        <a href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt">
          Magic: The Gathering Comprehensive Rules
        </a>
        , dated April 22, 2021. If these rules are outdated please let me know.{" "}
        <br />
        Source code for this page can be found at{" "}
        <a href="https://github.com/jlrhe/MtG-Rules">Github</a>
      </p>
    </div>
  );
};

export default App;
