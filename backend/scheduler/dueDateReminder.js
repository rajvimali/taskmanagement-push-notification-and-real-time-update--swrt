// backend/scheduler/dueDateReminder.js
const cron = require("node-cron");
const User = require("../models/User");
const messaging = require("../firebaseAdmin");
const task = require("../models/task");

// Function to send push notification
const sendPushNotification = async (fcmToken, title, body) => {
  const message = {
    notification: { title, body },
    token: fcmToken,
  };
  try {
    await messaging.send(message);
    console.log("Push notification sent successfully");
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};

// Check for tasks due within 24 hours
cron.schedule("0 * * * *", async () => {
  // Runs every hour
  const currentTime = new Date();
  const oneDayLater = new Date();
  oneDayLater.setDate(currentTime.getDate() + 1);

  const tasks = await task
    .find({
      dueDate: { $gte: currentTime, $lte: oneDayLater },
      status: { $ne: "completed" }, // Only notify for non-completed tasks
    })
    .populate("assignedTo");

  tasks.forEach(async (task) => {
    const assignedUser = task.assignedTo;
    const title = "Task Due Reminder";
    const body = `The task "${
      task.name
    }" is due on ${task.dueDate.toLocaleDateString()}. Please complete it soon.`;

    if (assignedUser && assignedUser.fcmToken) {
      await sendPushNotification(assignedUser.fcmToken, title, body);
    }
  });

  console.log("Due date reminder check completed.");
});
