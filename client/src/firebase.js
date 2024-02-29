// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sumit-portfolio-f04b9.firebaseapp.com",
  projectId: "sumit-portfolio-f04b9",
  storageBucket: "sumit-portfolio-f04b9.appspot.com",
  messagingSenderId: "836317909786",
  appId: "1:836317909786:web:34ef728b59a16d099ad2a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);