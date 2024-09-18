// backend/tests/notifications.test.js
const admin = require("firebase-admin");
jest.mock("firebase-admin", () => {
  return {
    messaging: jest.fn().mockReturnThis(),
    send: jest.fn().mockResolvedValue("Message sent successfully"),
  };
});

const { sendPushNotification } = require("../controllers/taskcontroller");

test("should send push notification to the assigned user", async () => {
  const fcmToken = "mock-fcm-token";
  const title = "New Task Assigned";
  const body = "You have been assigned a new task";

  const result = await sendPushNotification(fcmToken, title, body);

  expect(admin.messaging().send).toHaveBeenCalledWith({
    notification: { title, body },
    token: fcmToken,
  });
});
