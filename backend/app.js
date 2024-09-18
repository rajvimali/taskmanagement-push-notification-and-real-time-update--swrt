import React, { useEffect } from "react";
import {
  requestFirebaseNotificationPermission,
  onMessageListener,
} from "./firebase";

function App() {
  useEffect(() => {
    // Request permission to receive notifications
    requestFirebaseNotificationPermission()
      .then((token) => {
        console.log("User FCM Token:", token);
        // Send the token to your backend to subscribe the user for notifications
      })
      .catch((err) => console.error("FCM error:", err));

    // Listen for foreground notifications
    onMessageListener()
      .then((payload) => {
        console.log("Notification received in foreground:", payload);
        // Show in-app notification
      })
      .catch((err) => console.error("Message listener error:", err));
  }, []);

  return (
    <div className="App">
      <h1>Task Management App</h1>
    </div>
  );
}

export default App;
