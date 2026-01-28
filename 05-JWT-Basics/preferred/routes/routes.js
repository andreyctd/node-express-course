const express = require("express");
const { logon, hello } = require("../controllers/controller");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// POST /api/v1/logon (public)
router.post("/logon", logon);

// GET /api/v1/hello (protected)
router.get("/hello", authenticate, hello);

module.exports = router;
