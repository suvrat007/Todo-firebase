// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiiPwtqOirs3GgzN6cbCKM1wsUx7RdUWA",
    authDomain: "todos-firebase-85a16.firebaseapp.com",
    projectId: "todos-firebase-85a16",
    storageBucket: "todos-firebase-85a16.firebasestorage.app",
    messagingSenderId: "448894529362",
    appId: "1:448894529362:web:8911cb660da1476999148b",
    measurementId: "G-B5P0BZ9C76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db =  getFirestore(app);
export const auth = getAuth(app);