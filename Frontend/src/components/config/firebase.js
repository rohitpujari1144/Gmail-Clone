import { initializeApp } from "firebase/app";
import {  getAnalytics,  } from "firebase/analytics";
import {  getAuth, RecaptchaVerifier  } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBjqb0FVvyGwI77knBXAt9JLuxGzP3olAs",
    authDomain: "mobile-otp-verify.firebaseapp.com",
    projectId: "mobile-otp-verify",
    storageBucket: "mobile-otp-verify.appspot.com",
    messagingSenderId: "389153842870",
    appId: "1:389153842870:web:d5400f19595ba9fa36e817",
    measurementId: "G-5F6LY9S928"
  };

  const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)