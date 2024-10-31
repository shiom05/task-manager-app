const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config("../.env");
const SECRET_KEY = process.env.JWT_SECRET_KEY;


const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};


module.exports = authenticateToken;