const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1]; // Get the token from the Authorization header
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decodedToken.userId; // Attach user ID to the request
        next();
      });
    } else {
      res.status(403).json({ message: "Access token not provided" });
    }
  } catch (error) {}
};

module.exports = { verifyAccessToken };
