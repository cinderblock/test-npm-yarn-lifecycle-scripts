const fs = require("fs/promises");
const os = require("os");

const arg = process.argv[2];

fs.appendFile("output.txt", arg + os.EOL).then(
  () => {
    console.log("Ran script:", arg);
  },
  (err) => {
    console.log("Error in script:", arg);
    console.log(err);
  }
);
