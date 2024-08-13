


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAuth} from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
 import { getAnalytics } from "firebase/analytics";
  

 const firebaseConfig = {

  apiKey: "AIzaSyDK6vrnRrbUDwWp4DaQ9126jTCAYUYOEKo",
  authDomain: "slash-it-439df.firebaseapp.com",
  projectId: "slash-it-439df",
  storageBucket: "slash-it-439df.appspot.com",
  messagingSenderId: "812040782059",
  appId: "1:812040782059:web:1803a716328f61ff8dbeae",
  measurementId: "G-LTX41M7YT9"


};

// Initialize Firebase
const app =  initializeApp(firebaseConfig) 
 const firestore = getFirestore(app) 
 const auth = getAuth(app);
 const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
 export { auth, firestore, app, analytics };
 
// export default app;
