import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyD4KmKnnSOzeq1dZ2O-Wf8Jbqyl1tBuDRg",
  authDomain: "chat-app-eef87.firebaseapp.com",
  projectId: "chat-app-eef87",
  storageBucket: "chat-app-eef87.appspot.com",
  messagingSenderId: "158237165592",
  appId: "1:158237165592:web:ae3172934668f41ba25b6d",
  measurementId: "G-F8DE31LW1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);