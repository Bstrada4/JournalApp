// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvb8-KlD5l3gq02godXMpp-pCR0UqmqnI",
  authDomain: "journal-app-50849.firebaseapp.com",
  projectId: "journal-app-50849",
  storageBucket: "journal-app-50849.appspot.com",
  messagingSenderId: "574679913384",
  appId: "1:574679913384:web:4e6e9029f38854efd2839d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );