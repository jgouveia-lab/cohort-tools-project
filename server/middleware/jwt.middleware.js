const jwt = require("jsonwebtoken");

// Reads "Authorization: Bearer <token>", verifies it and stores the payload in req.payload
function isAuthenticated(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    req.payload = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { isAuthenticated };
