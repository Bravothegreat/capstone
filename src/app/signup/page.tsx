"use client";
import  { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";

import { doc, getDoc, setDoc } from "firebase/firestore";


export default function Signup() {

 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  
 const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await sendEmailVerification(user);

      //store user data
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName,
          lastName,
          email,
        })
      );

      setMessage(
        "Account created successfully. Please verify your email address."
      );

      //clear form fields

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

   
  const handleSigninnWithGoogle = async () => {
    setError(null);

    try {
     const googleAuthProvider = new GoogleAuthProvider();
     const result = await signInWithPopup(auth, googleAuthProvider);
     const user = result.user;

     if (user) {
      
        const firstName = user.displayName || "User";
         
         const lastName = user.displayName || "User";

       // check if user data exist in firestore
       const userDoc = await getDoc(doc(firestore, "users", user.uid));

       if (!userDoc.exists()) {
         // save data to firestore
         await setDoc(doc(firestore, "users", user.uid), {
         firstName,
          lastName,
        
         email: user.email,  
         });
       }
       // store user data in local storage
        localStorage.setItem(
          "userData",
          JSON.stringify({
            uid: user.uid,
            firstName,
            lastName,
            email: user.email,
          })
       );
       // navigate to dashboard
       router.push("/dashboard");
     } else {
       setError("Failed to authenticate with Google")
     }
    } catch (error) {
      if (error instanceof Error) {
       setError(error.message);
      } else {
       setError("An unknown error occured. Please try again")
      }
    };
  }



  return (
    <>
      <div>
        <form 
         className="form"
        onSubmit={handleSignup}>
          <h1>Sign Up</h1>
         

          <div className="input-group">
            <input
              placeholder=""
              className="input-group_input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="input-group_label" htmlFor="firstName">
              First Name
            </label>
          </div>

          <div className="input-group">
            <input
              placeholder=""
              className="input-group_input"
            
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="input-group_label" htmlFor="lastName">
              Last Name
            </label>
          </div>

          <div className="input-group">
            <input
              placeholder=""
              className="input-group_input"
              // required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input-group_label" htmlFor="email">
              Email
            </label>
            <span className="error">Not a valid Email</span>
          </div>

          <div className="input-group">
            <input
              placeholder=""
              className="input-group_input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="input-group_label" htmlFor="password">
              Password
            </label>
          </div>

          <div className="input-group">
            <input
              placeholder=""
              className="input-group_input"
              type="passwordconfirmation"
              value={passwordConfirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="input-group_label" htmlFor="passworconfirmation">
              Confirm Password
            </label>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

          <button>Sign Up</button>
          <p  className="link">
            Already have an account?{" "}
            <a href="#" onClick={() => router.push("/signin")}>
              Log In
            </a>
            </p>
            
            <div className="or">
              <div className="dash"></div>
              <div>OR</div>
              <div className="dash"></div>
             </div>
             </form>
        <button onClick={handleSigninnWithGoogle}>Sign up with Google</button>
      </div>
    </>
  );
}



