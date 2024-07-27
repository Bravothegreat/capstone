
//  import { initializeApp } from "firebase/app";
//  import { getAuth } from 'firebase/auth';
//  import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// Initialize Firebase
 

// const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

// const auth = getAuth(app);

// const firestore = getFirestore(app);

// export {auth, firestore, app};




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAuth, GoogleAuthProvider} from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 import { getAnalytics } from "firebase/analytics";
  

 const firebaseConfig = {

 apiKey: "AIzaSyDclpPQBrMlzHZo0D_koz3ILe1L8St83cY",
  authDomain: "scissors-5b817.firebaseapp.com",
  projectId: "scissors-5b817",
  storageBucket: "scissors-5b817.appspot.com",
  messagingSenderId: "785280573930",
  appId: "1:785280573930:web:fbd05ed5ee7cdd1c561293",
  measurementId: "G-ZGB05MC7PM"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const firestore = getFirestore(app);
 const auth = getAuth(app);
 const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
 export { auth, firestore, app, analytics};
 export const googleAuthProvider = new GoogleAuthProvider()
// export default app;
