// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN8LMq0pJASr3Blq6Am0hqVgkySC0xO5U",
  authDomain: "college-app-b226b.firebaseapp.com",
  projectId: "college-app-b226b",
  storageBucket: "college-app-b226b.firebasestorage.app",
  messagingSenderId: "516287884178",
  appId: "1:516287884178:web:1063fa15cc26d6e2fd6f4b",
  measurementId: "G-63LXDB62RR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);