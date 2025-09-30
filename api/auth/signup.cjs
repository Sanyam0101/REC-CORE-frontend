// api/auth/signup.js

const admin = require('firebase-admin');

// This block initializes the Firebase Admin SDK.
// It securely reads the secret key you stored in Vercel's environment variables.
// The "if" statement ensures this only runs once, which is a best practice.
if (!admin.apps.length) {
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// This is the main function that Vercel will run when this API endpoint is called.
module.exports = async (req, res) => {
  // We expect the frontend to send the user's name, email, and password.
  const { email, password, name } = req.body;

  try {
    // Step 1: Create a new user in Firebase's dedicated Authentication service.
    // This securely handles all the password hashing and storage for you.
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Step 2: Save the user's details (like their name and email) in our Firestore database.
    // We use the unique user ID (uid) from the authentication step as the document ID.
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    // Step 3: Send a success message back to the frontend.
    res.status(201).json({ message: 'User created successfully!', uid: userRecord.uid });
  } catch (error) {
    // If anything goes wrong (e.g., email already in use), send an error message.
    res.status(400).json({ error: error.message });
  }
};