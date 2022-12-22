const fs = require("fs/promises");
const os = require("os");

// Reorder the arguments so that the first argument is the script name
process.argv.unshift(process.argv.splice(2, 1)[0]);

const arg = process.argv.join(" - ");

fs.appendFile("output.txt", arg + os.EOL).then(
  () => {
    console.log("Ran script:", arg);
  },
  (err) => {
    console.log("Error in script:", arg);
    console.log(err);
  }
);
