// backend/middleware/checkUserPermission.js
const checkUserPermission = (req, res, next) => {
  const { userId } = req.user; // Assume req.user contains the authenticated user
  const { taskId } = req.params;

  Task.findById(taskId)
    .then((task) => {
      if (
        task &&
        (task.assignedTo.toString() === userId ||
          task.createdBy.toString() === userId)
      ) {
        next(); // User is authorized to receive updates
      } else {
        res
          .status(403)
          .json({ message: "You are not authorized to access this task" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Error checking task permissions", err })
    );
};

module.exports = checkUserPermission;
