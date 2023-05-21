import { initializeApp } from "firebase/app";
import {  getAnalytics,  } from "firebase/analytics";
import {  getAuth, RecaptchaVerifier  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBChbzMtHIefsqin4UXCbthtF7tSxyir4k",
    authDomain: "clone-947e6.firebaseapp.com",
    projectId: "clone-947e6",
    storageBucket: "clone-947e6.appspot.com",
    messagingSenderId: "903461764029",
    appId: "1:903461764029:web:dfcb9fe2f1556280c0b0d4",
    measurementId: "G-KG7M2067MM"
  };

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)
