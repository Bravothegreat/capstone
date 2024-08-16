
"use client";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
  toast.success ("   Thank you for submitting your email address to reset your password, a password reset link has been sent to the email address associated with your account. ", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

   

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      // router.push("/resetlink");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center px-8 py-4">
     
      <div className=" sm:mx-auto relative h-screen flex flex-col items-center justify-center gap-5 py-5 sm:w-[450px]">
        <Link href="/signin" 
         className="h-10 w-10 text-dark-gray absolute top-5 -left-5"
        >
           
       
        </Link>
        <h1 className="font-medium text-4xl text-deep-purple">Reset Password</h1>
        <span>
          <p className="w-full font-normal text-sm text-dark-gray mt-3 leading-normal sm:w-[460px] text-center">
            By entering your email address to reset your password, you&apos;ll
            receive a link in your inbox that will allow you reset your
            password.
          </p>
        </span>

        <form onSubmit={handleResetPassword} className="form">

          <div className="input-group">
             
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="email"
            name="email"
            placeholder=""
            // required
            className="input-group_input"
          />

              <label
               className="input-group_label"
              htmlFor="email" >
            Email Address
          </label>

          <span className="error">Not a valid Email</span>

           {error && <p style={{ color: "red" }}>{error}</p>}
          <button
           onClick={notify}
           
            className="w-full border-2 rounded-xl px-3 py-3 mt-6 text-center bg-deep-purple text-light-gray"
          >
            Reset Password
          </button>
          <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
