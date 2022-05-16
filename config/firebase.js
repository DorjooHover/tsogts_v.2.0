// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOjIeLo6UOh4JRNtojGpMexJm51cLi9zI",
  authDomain: "tsogts-c2011.firebaseapp.com",
  projectId: "tsogts-c2011",
  storageBucket: "tsogts-c2011.appspot.com",
  messagingSenderId: "4782471789",
  appId: "1:4782471789:web:f6e458ce93af48e0fa1d64",
  measurementId: "G-W2YGQNLG19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage()
export { db, auth, provider, storage };
