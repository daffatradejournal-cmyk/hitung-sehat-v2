const admin = require("firebase-admin");

const buildCredential = () => {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf8"),
    );

    return admin.credential.cert(serviceAccount);
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.credential.applicationDefault();
  }

  return null;
};

if (!admin.apps.length) {
  try {
    const credential = buildCredential();
    if (credential) {
      admin.initializeApp({ credential });
    } else {
      console.warn("⚠️ Firebase Admin credentials not provided. Server will run without Firebase Admin.");
    }
  } catch (err) {
    console.warn("⚠️ Error initializing Firebase Admin:", err.message);
  }
}

module.exports = admin;
