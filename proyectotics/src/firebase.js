// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAtEtYWCa5kGdT8DeC0Obpct8pgF9qlIw",
  authDomain: "rebolledo-f6d08.firebaseapp.com",
  projectId: "rebolledo-f6d08",
  storageBucket: "rebolledo-f6d08.firebasestorage.app",
  messagingSenderId: "771181780860",
  appId: "1:771181780860:web:95a65f406121108b2c8ef9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);