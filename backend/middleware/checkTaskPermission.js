// backend/middleware/checkTaskPermission.js
const Task = require("../models/task");

const task = require("../models/task");

const checkTaskPermission = async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user.id; // Assume req.user is populated by JWT middleware

  // Find the task and check if the logged-in user is the assigned user
  const task = await task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.assignedTo.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "You do not have permission to modify this task" });
  }

  next();
};

module.exports = checkTaskPermission;
