// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeEphVGQ9IbjXjgOTz4E_8LIkcDMa7PV0",
  authDomain: "leedshack-project.firebaseapp.com",
  projectId: "leedshack-project",
  storageBucket: "leedshack-project.firebasestorage.app",
  messagingSenderId: "395768542533",
  appId: "1:395768542533:web:d49665090f5b0e8b8e7a2c",
  measurementId: "G-QHLE3ZYC7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FIREBASE_APP =  initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

