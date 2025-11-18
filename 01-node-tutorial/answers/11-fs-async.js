const { writeFile } = require("fs");

console.log("Start writing async file");

writeFile("./temporary/fileB.txt", "Line 1\n", (err) => {
  if (err) console.log(err);
  else {
    console.log("Wrote line 1");
    writeFile("./temporary/fileB.txt", "Line 2\n", { flag: "a" }, (err) => {
      if (err) console.log(err);
      else {
        console.log("Wrote line 2");
        writeFile("./temporary/fileB.txt", "Line 3\n", { flag: "a" }, (err) => {
          if (err) console.log(err);
          else console.log("Wrote line 3");
        });
      }
    });
  }
});

console.log("End of script");
