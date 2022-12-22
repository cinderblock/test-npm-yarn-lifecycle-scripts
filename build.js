const fs = require("fs/promises");
const os = require("os");

// Reorder the arguments so that the first argument is the script name
process.argv.unshift(process.argv.splice(2, 1)[0]);

const arg = process.argv.join(" - ");

let num = null;

fs.readFile("output.txt", "utf8")
  .then(
    ({ length }) => (num = length),
    () => {}
  )
  .then(() =>
    fs.appendFile("output.txt", arg + os.EOL).then(
      () => {
        console.log("Ran script:", arg, "output.txt was length:", num);
      },
      (err) => {
        console.log("Error in script:", arg);
        console.log(err);
      }
    )
  );
