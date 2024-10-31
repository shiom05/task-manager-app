const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const authenticationMiddlwear = require("./middlewear/authenticate");
const logger = require("./logger");
const responseMiddlewear = require("./middlewear/response");

const dotenv = require("dotenv");
dotenv.config(".env");
const PORT = process.env.PORT;

const db = process.env.DB_URL;
const password = process.env.DB_PASSWORD;
const db_url = db.replace("<db_password>", password);
const mongoose = require("mongoose");
mongoose
  .connect(db_url, {})
  .then((res) => {
    logger.info("MongoDB Connected Successfullly", {
      timestamp: new Date().toISOString(),
      message: res,
    });
  })
  .catch((error) => {
    logger.info("MongoDB connection error", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
  });

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());
app.use(responseMiddlewear);

app.use((req, res, next) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/user", userRoute);
app.use("/api/task", authenticationMiddlwear, taskRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
