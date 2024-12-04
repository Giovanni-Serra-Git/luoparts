// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "luoparts.firebaseapp.com",
  projectId: "luoparts",
  storageBucket: "luoparts.firebasestorage.app",
  messagingSenderId: "615577779369",
  appId: "1:615577779369:web:f36ba7a2b5524034a7bdb8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);