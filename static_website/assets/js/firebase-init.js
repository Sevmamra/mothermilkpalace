// ✅ Firebase configuration (replace these with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🔥 Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Get Firebase Auth reference
const auth = firebase.auth();
