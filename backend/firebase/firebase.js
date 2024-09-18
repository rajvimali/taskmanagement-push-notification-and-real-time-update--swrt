// firebase.js
import firebase from "firebase/app";
import "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEauaPenluoLvdpDIqD5BHUEmfUqgwGR0",
  authDomain: "pushnotification-timeupadte.firebaseapp.com",
  projectId: "pushnotification-timeupadte",
  storageBucket: "pushnotification-timeupadte.appspot.com",
  messagingSenderId: "36336504906",
  appId: "1:36336504906:web:e811f858df96a0689e56b3",
  measurementId: "G-KP08NQ6HL7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await messaging.getToken();
      console.log("FCM Token:", token);
      return token; // Send this token to the backend to subscribe the user
    } else {
      console.error("Permission denied for notifications");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
