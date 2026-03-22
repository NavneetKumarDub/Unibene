// Auth middleware

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Not authorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: data.id, role: data.role }; // attach user
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
