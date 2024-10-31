const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    requried: true,
    unique: true,
  },

  taskName: {
    type: String,
    requried: true,
  },
  taskDescription: {
    type: String,
    requried: true,
  },
  taskInprogress: {
    type: String,
    requried: true,
    set: function (value) {
      console.log(value);
      if (value) {
        return "InProgress";
      } else {
        return "Complete";
      }
    },
    get: function (value) {
      return value === "InProgress";
    },
  },
  taskCreatedDate: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

taskSchema.set('toJSON', {
  getters: true,
  virtuals: false,
});

taskSchema.set('toObject', {
  getters: true,
  virtuals: false,
})

const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
