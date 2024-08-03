import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD4KmKnnSOzeq1dZ2O-Wf8Jbqyl1tBuDRg",
  authDomain: "chat-app-eef87.firebaseapp.com",
  projectId: "chat-app-eef87",
  storageBucket: "chat-app-eef87.appspot.com",
  messagingSenderId: "158237165592",
  appId: "1:158237165592:web:ae3172934668f41ba25b6d",
  measurementId: "G-F8DE31LW1T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, db, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut }