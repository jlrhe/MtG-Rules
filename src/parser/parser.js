const fs = require("fs");

if (typeof process.argv[2] !== "undefined") {
  const file = process.argv[2];
  const readFile = (path) => {
    try {
      const text = fs.readFileSync(path, "utf8");
      return text;
    } catch (err) {
      console.error(err);
    }
  };
  const rawRules = readFile(file);
  console.log(rawRules);
} else {
  console.log(
    "Usage: node parser.js file \n",
    "Please provide the file to be parsed as an argument \n",
    "The file must be the same or similar enough format as https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt"
  );
}
