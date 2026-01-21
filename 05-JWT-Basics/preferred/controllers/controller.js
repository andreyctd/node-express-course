const jwt = require("jsonwebtoken");

// POST /api/v1/logon
exports.logon = (req, res) => {
  const { name, password } = req.body;

  // No real auth required for this assignment
  if (!name || !password) {
    return res.status(400).json({ message: "name and password required" });
  }

  const payload = { name };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({ message: "Login successful", token });
};

// GET /api/v1/hello
exports.hello = (req, res) => {
  res.status(200).json({
    message: `Hello ${req.user.name}!`,
  });
};
