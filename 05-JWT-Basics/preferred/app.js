const express = require("express");
const app = express();
const routes = require("./routes/routes");
const path = require("path");
const dotenv = require("dotenv");
// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static frontend files from "public" directory for testing purposes only
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/v1", routes);

// Catch-all route for unknown endpoints (optional)
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start the server on specified port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
