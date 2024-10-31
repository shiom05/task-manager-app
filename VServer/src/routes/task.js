const express = require("express");
const router = express.Router();

const {
  createTaskHandler,
  getTaskHandler,
  editTaskHandler,
  deleteTaskHandler,
  markAsComplete,
} = require("../controllers/TaskController");

router.post("/", createTaskHandler);
router.get("/:userId", getTaskHandler);
router.put("/:taskId/complete", markAsComplete);
router.put("/:taskId", editTaskHandler);
router.delete("/:taskId/:userId", deleteTaskHandler);

module.exports = router;
