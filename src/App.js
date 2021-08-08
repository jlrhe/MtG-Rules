import React, { useEffect, useState } from "react";
import "./App.css";
import parser from "./parser/parser";

const App = () => {
  const [rules, setRules] = useState("loading rules...");
  const [parsedRules, setParsedRules] = useState([]);
  //cors proxy is fine for fetching static data without credentials
  const [rulesUrl, setRulesUrl] = useState(
    "https://thingproxy.freeboard.io/fetch/https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );
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
  return (
    <div className="App">
      <header className="page-header">MtG Rules</header>
      <p>{parsedRules.toString()}</p>
    </div>
  );
};

export default App;
