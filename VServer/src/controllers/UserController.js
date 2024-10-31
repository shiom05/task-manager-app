const User = require("../models/User");
const logger = require("../logger");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config("../.env");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registerUserHandler = async (req, res) => {
  const userData = req.body;
  const user = new User(userData);
  try {
    const userResult = (await user.save()).toObject();
    const { userPassword, ...userProfile } = userResult;
    const token = jwt.sign({ username: userProfile.userName }, SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({
      message: "User Logged In Successfully!",
      user: userProfile,
      token
    });
  } catch (error) {
    logger.error("Error in Registering User", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const loginUserHandler = async (req, res) => {
  const loginData = req.body;
  try {
    const user = await User.findOne({ userEmail: loginData.userEmail });
    if (!user) {
      return res.status(404).json({ message: "Invalid User Email" });
    } else {
      if (await user.comparePassword(loginData.userPassword)) {
        const { userPassword, ...userProfile } = user.toObject();
         const token = jwt.sign({ username: user.userName }, SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({
          message: "User Logged In Successfully!",
          user: userProfile,
          token
        });
      } else {
          return res.status(401).json({
            message: "Invalid Password",
          });
      }
    }
  } catch (error) {
    logger.error("Error in Registering User", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error });
  }
};

module.exports = {
  registerUserHandler,
  loginUserHandler,
};
