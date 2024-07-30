"use client";
import React, { useState } from "react";
import  { useRouter } from "next/navigation";
import { signInWithEmailAndPassword,  signInWithPopup } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { GoogleAuthProvider } from "firebase/auth";

 const Signin = () => {
  const [email, setEmail] = useState("");                                                           
  
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  const handleSigin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user.emailVerified) {
        // retrive user data from local storage

        const registrationData = localStorage.getItem("registrationData");
        const {
          firstName = "",
          lastName = "",
          password = "",
        } = registrationData ? JSON.parse(registrationData) : {};

        // check if user data is valid and exist in firebase

        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "user", user.uid), {
            firstName,
            lastName,
            password,
            email: user.email,
          });
        }
        router.push("/dashboard");
      } else {
        setError("please verify your email before logging in");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };


  const handleSiginwithGoogle = async () => {
    setError(null);

    try {
      const googleAuthProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      // check if user data exist in firestore
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (!userDoc.exists()) {
        // save data to firestore
        await setDoc(doc(firestore, "users", user.uid), {
          email: user.email,
          firstName: user.displayName || "User",
          lastName: user.displayName || "User",
        });
      }
      // store user data in local storage
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          firstName: user.displayName || "User",
          lastName: user.displayName || "User",
        })
      );
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again");
      }
    }

  };


  return (
    <>
      <div>
        <form
         className="form"
        onSubmit={handleSigin}>
          <h1>Sign In</h1>

          <div className="input-group">
           <input
            className="input-group_input"
            placeholder=""
            type="email"
            // required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
            <label
             className="input-group_label"
            >
              Email </label>
             <span className="error">Not a valid Email</span>
          </div>

        
          <div className="input-group">
            <input
            className="input-group_input"
            placeholder=""
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
              <label
               className="input-group_label"
              >
                Password</label>
          </div>
         

          <button>Sign In</button>
        
          {error && <p style={{ color: "red" }}>{error}</p>}

          <p className="link">
          
          <Link 
           className="forgotpass"
          href="/resetpassword">Forgot password</Link>
        </p>

          <p className="link">
            Don't have an account? <Link href="/signup">Sign up here</Link>
          </p>

          <div className="or">
              <div className="dash"></div>
              <div>OR</div>
              <div className="dash"></div>
             </div> 

          
        </form>
        <button onClick={handleSiginwithGoogle}>Continue with google</button>
      
      </div>
    </>
  );

 }
export default Signin;