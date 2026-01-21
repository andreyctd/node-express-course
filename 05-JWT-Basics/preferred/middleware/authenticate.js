const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user info on request
    req.user = { name: decoded.name };

    next();
  } catch (err) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = authenticate;
