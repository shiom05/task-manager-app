const Task = require("../models/Task");
const logger = require("../logger");

const getTasks = async (userId, res) => {
  try {
    const tasks = await Task.find({ userId });
    return tasks;
  } catch (error) {
    logger.error("Error in Fetching All Tasks", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const createTaskHandler = async (req, res) => {
  const body = req.body;
  const userId = body.userId;
  const taskId = `task-${Math.round(
    Math.random() * 90909 * Math.random() * 1000
  )}`;
  try {
    const task = new Task({ ...body, taskId });
    const savedTask = await task.save();
    if (savedTask) {
      const tasks = await getTasks(userId, res);
      return res.status(200).json({
        message: "Saved Task Succesfully!",
        tasks,
        savedTask: savedTask.toObject(),
      });
    }
  } catch (error) {
    logger.error("Error in Creating Task", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const getTaskHandler = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await getTasks(userId, res);
    return res.status(200).json({
      message: "Fetched All Tasks Succesfully",
      tasks,
    });
  } catch (error) {
    logger.error("Error in Fetching Task", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const editTaskHandler = async (req, res) => {
  const taskId = req.params.taskId;
  const { task, userId } = req.body;
  try {
    const result = await Task.updateOne({ taskId }, { $set: task });
    if (result.modifiedCount === 1) {
      const tasks = await getTasks(userId, res);
      return res.status(200).json({
        message: "Edited Task Succesfully!",
        tasks,
      });
    } else {
      return res.status(400).json({ message: "Unable to Edit Task" });
    }
  } catch (error) {
    logger.error("Error in Editing Task", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};
const deleteTaskHandler = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.params.userId;
  try {
    const result = await Task.deleteOne({ taskId });
    if (result.deletedCount === 1) {
      const tasks = await getTasks(userId, res);
      return res.status(200).json({
        message: "Deleted Task Succesfully!",
        tasks,
      });
    } else {
      return res.status(400).json({ message: "Unable to Delete Task" });
    }
  } catch (error) {
    logger.error("Error in Deleting Task", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};
const markAsComplete = async (req, res) => {
  const taskId = req.params.taskId;
  const taskInprogress = !req.body.taskInprogress;
  const userId = req.body.userId;
  try {
    const result = await Task.updateOne(
      { taskId },
      {
        $set: {
          taskInprogress,
        },
      }
    );
    if (result.modifiedCount === 1) {
      const tasks = await getTasks(userId, res);
      return res.status(200).json({
        message: "Edited Task Succesfully!",
        tasks,
      });
    } else {
      return res.status(400).json({ message: "Unable to Edit Task" });
    }
  } catch (error) {
    logger.error("Error in Marking Task as Complete", {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

module.exports = {
  createTaskHandler,
  getTaskHandler,
  editTaskHandler,
  deleteTaskHandler,
  markAsComplete,
};
