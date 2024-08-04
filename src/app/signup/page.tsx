
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import Image from "next/image";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { IoIosArrowRoundBack } from "react-icons/io";

const Signup = () => {
  
 
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSignin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
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
      // router.push("/successRegistration");
      // Temporarily store user data in local storage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          profileName,
          email,
        })
      );

      setMessage(
        "Account created successfully. Please verify your email address."
      );

      // Clear form fiels
      setProfileName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unkown error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (user) {
        // Google-authenticated users are considered verified
        const profileName = user.displayName || "User"; // Use displayName from Google
  
        // Check if user data exist in firestore
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {
          // Save user data to firestore
          await setDoc(doc(firestore, "users", user.uid), {
            profileName,
            email: user.email,
          });
        }
  
        // Store user data in local storage
        localStorage.setItem(
          "userData",
          JSON.stringify({
            uid: user.uid,
            profileName,
            email: user.email,
          })
        );
  
        // Navigate to dashboard
        router.push("/dashboard");
      } else {
        setError("Failed to authenticate with Google");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      
         

        <form onSubmit={handleSignin} className="form">
           <div className="form-header">
           <p  className="link">
            {" "}
            <a href="#" onClick={() => router.push("/")}>
            <IoIosArrowRoundBack className="back-arrow" />
            </a>
            </p>
           <h1>Create Scissors Account</h1>
           <p  className="link">
            {" "}
            <a href="#" onClick={() => router.push("/signin")}>
              Login Now
            </a>
            </p>
           </div>

            <div className="input-group">
            
           

            <input
              type="text"
              id="profileName"
              placeholder=""
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              // required
              className="input-group_input"
            />

            <label
              htmlFor="profileName"
              className="input-group_label"
            >
              UserName
            </label>

            </div>
          

            <div className="input-group">
         
          
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              className="input-group_input"
              // required
            />

            <label
              htmlFor="email"
              className="input-group_label"
            >
              Email Address
            </label>
            <span className="error">Not a valid Email</span>
            </div>

           <div className="input-group">

         
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              className="input-group_input"
              // required
            />

             <label
              htmlFor="password"
              className="input-group_label"
            >
              Password
            </label>      

           </div>

           <div className="input-group">

          
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=""
              className="input-group_input"
              // required
            />

            <label
              htmlFor="confirmPassword"
              className="input-group_label"
            >
              Confirm Password
            </label>

           </div>

            {error && <p style={{color: "red"}}>{error}</p>}

            {message && <p style={{ color: "green" }}>{message}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className={` ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="or">
              <div className="dash"></div>
              <div className="continue-with">or go with</div>
              <div className="dash"></div>
             </div>

        </form>

        
            <button onClick={handleGoogleSignUp} disabled={loading} className="google-sign">
              <Image
                className="google-image"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={20}
                height={5}
                loading="lazy"
                alt="google logo"
              />
              <span>Google</span>

            </button>
        
      </div>
    
  );
};

export default Signup;






