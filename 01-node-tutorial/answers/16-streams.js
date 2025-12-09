const { createReadStream } = require("fs");

const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log("Received chunk:", chunk);
});

stream.on("end", () => {
  console.log("Stream ended.");
  console.log("Total chunks:", chunkCount);
});

stream.on("error", (err) => {
  console.log("Stream error:", err);
});
