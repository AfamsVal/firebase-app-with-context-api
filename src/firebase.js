// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8DAP0rqXMShLs1eROvbcwnrfPp0ufIEs",
  authDomain: "fir-auth-9dac5.firebaseapp.com",
  projectId: "fir-auth-9dac5",
  storageBucket: "fir-auth-9dac5.appspot.com",
  messagingSenderId: "118828674787",
  appId: "1:118828674787:web:fdf8a0a617d7d938cedfd6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
