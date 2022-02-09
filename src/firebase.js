// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuksF6uSwqgTszsbSxI1RYnIdw9pobcys",
  authDomain: "reactauth-13e01.firebaseapp.com",
  projectId: "reactauth-13e01",
  storageBucket: "reactauth-13e01.appspot.com",
  messagingSenderId: "671098764874",
  appId: "1:671098764874:web:00a31ab663d41b5268f0b3",
  measurementId: "G-EQW4F134JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;