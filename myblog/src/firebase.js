
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";;
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF9Ay_pTgw-yGSn73mQeGDQdD3sd2uaBA",
  authDomain: "test-c450f.firebaseapp.com",
  projectId: "test-c450f",
  storageBucket: "test-c450f.firebasestorage.app",
  messagingSenderId: "871056739346",
  appId: "1:871056739346:web:8bb2c72638ead73bb95ccb",
  measurementId: "G-J9E89GJTWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app)



const auth =getAuth()
export{
    app,
    analytics,
    auth,
    db
}