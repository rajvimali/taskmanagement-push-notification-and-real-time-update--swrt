// backend/routes/taskRoutes.js
const express = require("express");
const { updateTask } = require("../controllers/taskcontroller");
const checkTaskPermission = require("../middleware/checkTaskPermission");
const router = express.Router();

// Only assigned users can update tasks
router.put("/:taskId", checkTaskPermission, updateTask);
router.post("/:taskId/comments", addComment);
router.post("/:taskId/comments", taskLimit, addComment); // Apply rate limiting to comments
module.exports = router;
