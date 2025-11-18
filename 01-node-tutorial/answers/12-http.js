const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to the Home Page!");
  } else if (req.url === "/about") {
    res.end("Here is the About Page");
  } else {
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
