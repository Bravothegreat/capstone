

 "use client";
import React, { useEffect } from "react";
import DashboardLayout from "../../component/DashboardLayout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  getAuth,
  User,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardProfile: React.FC = () => {
  const auth = getAuth();
  const firestore = getFirestore();

  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userBio, setUserBio] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Function to get user profile data
  const fetchUserProfile = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", user.uid)); // Assuming "users" collection contains user profiles

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData?.profileName || null);
        setUserEmail(user.email);
        setUserBio(userData?.bio || null);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Function to update user profile data
  const updateUserProfile = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(firestore, "users", user.uid);

      await updateDoc(userDocRef, {
        profileName: userName,
        bio: userBio,
      });

      if (userEmail && user.email !== userEmail) {
        // Re-authenticate the user before updating the email
        const credential = EmailAuthProvider.credential(
          user.email!,
          prompt("Enter your current password:")!
        );
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, userEmail);
       }

      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserProfile(currentUser);
      } else {
        setUser(null);
        setUserName(null);
        setUserEmail(null);
        setUserBio(null);
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [auth, firestore, router]);

  return (
    <DashboardLayout>
      <div className=" rounded-md ">
      <h1 className=" flex justify-center mt-12 font-extrabold text-2xl ">Profile</h1>
      <div className="flex justify-center ">
     
       {isEditing ? (
        <div className="flex flex-col w-64 gap-4 ">

          <div className="flex justify-center flex-col gap-4  ">

          <label className="">
            Name:
            <input
             className="border border-blue-400 p-2 rounded-md active:border-blue-500"
              type="text"
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          
          <label className="">
            Email:
            <input
            className="border  border-blue-400 p-2 rounded-md "
              type="email"
              value={userEmail || ""}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
          
          <label className="flex flex-col ">
            Bio:
            <textarea
             className="border border-blue-400 rounded-md active:border-blue-500"
              value={userBio || ""}
              onChange={(e) => setUserBio(e.target.value)}
            />
          </label>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>

          <div className="flex gap-2 justify-center pb-4 ">
          <button 
            className="border border-blue-500 rounded-md p-4 text-base"
          onClick={updateUserProfile}>Save changes</button>

          <button 
            className="border border-blue-500 rounded-md p-4 text-base"
          onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
          
          </div>
          

      ): (
        <div className="flex flex-col justify-center gap-4  p-10 w-76">
          <div className="">
          <div className="flex flex-col">
             <span >Name:</span>  
             
             <p className="border border-gray-500">{userName}</p>
             
             </div> 

          <div className="flex flex-col"> 
            <span>Email:</span> 
            <p className="border border-gray-500">{userEmail}</p>
            </div> 
            </div>

          <div className="flex flex-col"> 
            <span>Bio:</span> 
             <p className="">{userBio}</p>
             
             </div> 

          <button 
          className="border border-blue-500 rounded-md p-4"
          onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
      
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardProfile;



 