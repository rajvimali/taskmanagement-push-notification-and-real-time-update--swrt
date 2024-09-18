// backend/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  dueDate: { type: Date },
  comments: [{ text: String, date: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model("Task", taskSchema);
