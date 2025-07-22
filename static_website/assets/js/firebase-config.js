// 🔥 Firebase SDK CDN se lena zaroori hai (HTML me include karo):
// <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"></script>

// ✅ Your Firebase config object
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ✅ Get database reference
const database = firebase.database();
