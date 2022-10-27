// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa-jg8LoSaZprHrq4PTAvIiTjBRuo_2a8",
  authDomain: "e-niemi.firebaseapp.com",
  databaseURL: "https://e-niemi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-niemi",
  storageBucket: "e-niemi.appspot.com",
  messagingSenderId: "832128070058",
  appId: "1:832128070058:web:49aadd613ca76a05f9fbd3",
  measurementId: "G-XNMEWGVVB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {db};
export {app};
export {auth};
