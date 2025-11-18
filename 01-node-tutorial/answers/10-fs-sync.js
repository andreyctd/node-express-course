const fs = require("fs");
fs.writeFileSync("./temporary/fileA.txt", "Line 1\n");
fs.writeFileSync("./temporary/fileA.txt", "Line 2\n", { flag: "a" });
fs.writeFileSync("./temporary/fileA.txt", "Line 3\n", { flag: "a" });

const data = fs.readFileSync("./temporary/fileA.txt", "utf8");
console.log(data);
