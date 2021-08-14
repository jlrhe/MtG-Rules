const parser = (rawRules) => {
  //if the rules haven't been fetched yet
  if (rawRules.length <= 0 || rawRules === undefined) {
    return [
      {
        id: "1.",
        title: "loading...",
        chapters: [
          {
            id: "100.",
            title: "loading...",
            rules: [{ id: "100.1.", rule: "Loading Rules..." }],
          },
        ],
      },
    ];
  }
  const splittedRules = rawRules.split("\r\n\r\n");
  //some "wanted" elements start with linebreaks or spaces so let's get rid of those
  let trimmedRules = splittedRules.map((element) => {
    let trimmedElement = element.trim();
    //oddly enough "\r\n" is 3 characters
    if (element.slice(0, 3) === "\r\n") {
      trimmedElement = element.slice(3);
      trimmedElement.trim(); //in case there are spaces after linebreak
    }
    return trimmedElement;
  });

  //Filter out everything that doesn't start with a number
  let filteredRules = trimmedRules.filter((value) => !isNaN(value[0]));

  //removing the contents listing. There must be a better way to do this - I'll come back to this when time allows.
  for (let i = 0; i < 9; i++) {
    filteredRules.shift();
  }

  //console.log("parser, filtered: ", filteredRules);

  //Let's now build a JSON object from the rules
  let parsedRules = [];

  //create sections
  filteredRules.forEach((element) => {
    //section numbers are of form "x. ". if the rules ever expand to double digit sections this is covered..
    if (element[2] === " ") {
      parsedRules.push({
        id: element.slice(0, 2),
        title: element.slice(3),
        chapters: [],
      });
    } else if (element[3] === " ") {
      parsedRules.push({
        id: element.slice(0, 3),
        title: element.slice(4),
        chapters: [],
      });
    }
    //chapter numbers are of form "xxx. "
    else if (!isNaN(element.slice(0, 3)) && element[4] === " ") {
      let section = parseInt(element[0]) - 1;
      parsedRules[section].chapters.push({
        id: element.slice(0, 4),
        title: element.slice(5),
        rules: [],
      });
      //rule numbers are of form "xxx.x..." (x is a number).
    } else if (!isNaN(element.slice(0, 3)) && !isNaN(element[4])) {
      let section = parseInt(element[0]) - 1;
      let chapterIndex = parseInt(element.slice(1, 3));
      if (parsedRules[section].chapters[chapterIndex] !== undefined) {
        //there are undefineds so this is neccessary, but it also means there's an issue which I'll have to look into at some point
        let rule = {
          id: element.slice(0, element.indexOf(" ")),
          rule: element.slice(element.indexOf(" ") + 1),
          example: "",
        };
        if (rule.rule.indexOf("Example") !== -1) {
          //if there's an example
          rule.rule = element.slice(
            element.indexOf(" ") + 1,
            element.indexOf("Example")
          );
          rule.example = element.slice(element.indexOf("Example"));
        }
        parsedRules[section].chapters[chapterIndex].rules.push(rule);
      }
    }
  });
  //console.log("parser: ", parsedRules);
  return parsedRules;
  //hard coded for development
  /*   let parsed = [
    {
      id: "1.",
      title: "Game Concepts",
      chapters: [
        {
          id: "100.",
          title: "General",
          rules: [
            {
              id: "100.1.",
              rule: "These Magic rules apply to any Magic...",
              example: "",
            },
            {
              id: "100.1a",
              rule: "A two-player game is a game that begins with only two players.",
              example: "",
            },
          ],
        },
        {
          id: "101.",
          title: "The Magic Golden Rules",
          rules: [
            {
              id: "101.1",
              rule: "Whenever a card’s text directly contradicts these ...",
              example: "",
            },
            {
              id: "101.2",
              rule: "When a rule or effect allows or directs something to...",
              example: "",
            },
          ],
        },
      ],
    },
    {
      id: "2.",
      title: "Parts of a Card",
      chapters: [
        {
          id: "200.",
          title: "General",
          rules: [
            {
              id: "200.1.",
              rule: "The parts of a card are name, mana cost, illustration, color indicator...",
              example: "",
            },
            {
              id: "200.2",
              rule: "Some parts of a card are also characteristics of the object that...",
              example: "",
            },
          ],
        },
        {
          id: "201.",
          title: "Name",
          rules: [
            {
              id: "201.1",
              rule: "The name of a card is printed...",
              example: "",
            },
            {
              id: "201.2",
              rule: "A card’s name is always considered to be the English...",
              example:
                "Example: when you test an app it ahelps to have example texts",
            },
          ],
        },
      ],
    },
  ];
  return parsed; */
};

export default parser;
