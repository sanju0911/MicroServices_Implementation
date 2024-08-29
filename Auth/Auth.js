const jsonwebtoken = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // Verify the token
    const decoded = jsonwebtoken.verify(token, process.env.SECRET);
    console.log("Decoded Token:", decoded);

    // Attach decoded info to the request object
    req.user = decoded;

    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
