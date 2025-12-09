const { writeFile, readFile } = require("fs").promises;

// async writer() — writes 3 lines to temp.txt
const writer = async () => {
  try {
    await writeFile("temp.txt", "Line 1\n");
    await writeFile("temp.txt", "Line 2\n", { flag: "a" });
    await writeFile("temp.txt", "Line 3\n", { flag: "a" });
  } catch (err) {
    console.log("Writer error:", err);
  }
};

// async reader() — reads temp.txt and logs content
const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf8");
    console.log("File contents:\n", data);
  } catch (err) {
    console.log("Reader error:", err);
  }
};

// async readWrite() — calls writer then reader in correct order
const readWrite = async () => {
  await writer();
  await reader();
};

// call the function
readWrite();