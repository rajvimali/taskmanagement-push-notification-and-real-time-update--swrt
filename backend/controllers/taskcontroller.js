// backend/controllers/taskController.js
const messaging = require("../firebaseAdmin"); // Import messaging from Firebase Admin
const task = require("../models/task");
const task = require("../models/task");
const User = require("../models/User"); // Assume you have a User model

// Send a real-time task assignment notification
io.emit("taskAssigned", { taskId: task._id, assignedTo: user._id });

// Example for task completion
const completeTask = async (req, res) => {
  const { taskId, fcmToken } = req.body;

  // Perform task completion logic
  const task = await Task.findByIdAndUpdate(taskId, { status: "completed" });

  // Send push notification
  const title = "Task Completed";
  const body = `The task "${task.name}" has been completed.`;
  await sendPushNotification(fcmToken, title, body);

  res.status(200).json({ success: true, task });
};
// Function to send push notification
const sendPushNotification = async (fcmToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken, // The FCM token of the user
  };

  try {
    await messaging.send(message);
    console.log("Push notification sent successfully");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

// Example for task assignment
const assignTask = async (req, res) => {
  const { taskId, assignedUserId, fcmToken } = req.body;

  // Perform task assignment logic
  const task = await Task.findByIdAndUpdate(taskId, {
    assignedTo: assignedUserId,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  // Find the task and the user being assigned the task
  const user = await User.findById(assignedUserId);

  if (!task || !user) {
    return res.status(404).json({ message: "Task or User not found" });
  }

  // Assign the task to the user
  task.assignedTo = user._id;
  await task.save();
  // Emit real-time task assignment
  //   io.emit("taskUpdated", task);

  //   res.status(200).json({ success: true, task });
};

// Example for due date reminders
const sendDueDateReminder = async () => {
  // Find tasks near their due date
  const tasks = await Task.find({ dueDate: { $lte: new Date() } });

  tasks.forEach(async (task) => {
    const fcmToken = task.assignedUser.fcmToken; // Fetch user's FCM token
    const title = "Task Due Reminder";
    const body = `The task "${task.name}" is due soon.`;
    await sendPushNotification(fcmToken, title, body);
  });
};

const createTask = async (req, res) => {
  const { name, description, assignedTo } = req.body;

  const task = new task({ name, description, assignedTo, dueDate });
  await task.save();

  // Emit real-time new task creation
  io.emit("newTask", task);

  res.status(201).json({ success: true, task });
};
