"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuthProvider, firestore } from "../firebase/firebase";
// import {googleAuthProvider} from "../firebase/firebase";
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

  const handleSignInWithGoogle = async () => {
    setError(null);
    setMessage(null);
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const user = userCredential.user;
      await sendEmailVerification(user);

      if (user.emailVerified) {
        setMessage(
          "Account created successfully. Please verify your email address."
        );

        // retrive user data from local storage
        const registrationData = localStorage.getItem("registrationData");
        const {
          firstName = "",
          lastName = "",
          password = "",
        } = registrationData ? JSON.parse(registrationData) : {};

        //store user data
        localStorage.setItem(
          "registrationData",
          JSON.stringify({
            firstName,
            lastName,
            email,
          })
        );

        //check if user data is valid and exist in firebase
        const userDoc = await getDoc(doc(firestore, "user", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "user", user.uid), {
            firstName,
            lastName,
            password,
            email: user.email,
          });
        }

        setMessage("Signed in with Google successfully.");
        router.push("/dashboard"); // Redirect to a desired page after successful sign-in
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


          <button onClick={handleSignInWithGoogle}>Sign up with Google</button>
        </form>
      </div>
    </>
  );
}
