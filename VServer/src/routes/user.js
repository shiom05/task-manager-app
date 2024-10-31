const express = require("express");
const router = express.Router();
const {
  loginUserHandler,
  registerUserHandler,
} = require("../controllers/UserController");

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);

module.exports = router;
