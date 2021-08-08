const parser = (rules) => {
  //hard coded for development
  let parsed = [
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
      title: "Game Concepts",
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
  return parsed;
};

export default parser;
