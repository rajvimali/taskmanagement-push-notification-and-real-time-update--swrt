// backend/firebaseAdmin.js
const admin = require("firebase-admin");
// const serviceAccount = require("./path-to-your-service-account-key.json");

admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

module.exports = messaging;
