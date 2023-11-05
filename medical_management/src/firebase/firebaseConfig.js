// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp ({
  apiKey: "AIzaSyB3EJf3eGwLvT3e8QEssHKnfisgYTevTZ8",
  authDomain: "medical-supplies-managem-c9263.firebaseapp.com",
  projectId: "medical-supplies-managem-c9263",
  storageBucket: "medical-supplies-managem-c9263.appspot.com",
  messagingSenderId: "781001703336",
  appId: "1:781001703336:web:cf55afdaa0d9f4166ca79d",
  measurementId: "G-P4JLNZ0N8V"
});

// Initialize Firebase
export const storage = getStorage(app);
//  default storage;