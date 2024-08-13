

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
      <div className="bg-[rgba(50,132,255,0.14)] rounded-md ">
      <h1 className=" flex justify-center pt-4">Profile</h1>
      <div className="flex justify-center">
        
       {isEditing ? (
        <div className="flex flex-col w-64 gap-4">

          <div className="flex justify-center flex-col gap-4 ">

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



 

// "use client";
// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../component/DashboardLayout";
// import { useRouter } from "next/navigation";
// import {
//   onAuthStateChanged,
//   getAuth,
//   User,
//   updateEmail,
//   reauthenticateWithCredential,
//   EmailAuthProvider,
// } from "firebase/auth";
// import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DashboardProfile: React.FC = () => {
//   const auth = getAuth();
//   const firestore = getFirestore();
//   const storage = getStorage();

//   const [user, setUser] = useState<User | null>(null);
//   const [userName, setUserName] = useState<string | null>(null);
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [userBio, setUserBio] = useState<string | null>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null); // New state for profile image URL
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | null>(null); // New state for selected image file
//   const router = useRouter();

//   // Function to get user profile data
//   const fetchUserProfile = async (user: User) => {
//     try {
//       const userDoc = await getDoc(doc(firestore, "users", user.uid)); // Assuming "users" collection contains user profiles

//       if (userDoc.exists()) {
//         const userData = userDoc.data();
//         setUserName(userData?.profileName || null);
//         setUserEmail(user.email);
//         setUserBio(userData?.bio || null);
//         setProfileImage(userData?.profileImage || null); // Set profile image URL
//       } else {
//         console.log("No such document!");
//       }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   // Function to handle profile image upload
//   const handleImageUpload = async (file: File) => {
//     if (!user || !file) return;

//     try {
//       const storageRef = ref(storage, `profileImages/${user.uid}`);
//       await uploadBytes(storageRef, file);
//       const downloadURL = await getDownloadURL(storageRef);

//       // Update the profileImage field in Firestore
//       const userDocRef = doc(firestore, "users", user.uid);
//       await updateDoc(userDocRef, { profileImage: downloadURL });

//       setProfileImage(downloadURL);
//       toast.success("Profile image updated successfully!", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } catch (error) {
//       console.error("Error uploading profile image:", error);
//       toast.error("Failed to upload profile image. Please try again.", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   // Function to update user profile data
//   const updateUserProfile = async () => {
//     if (!user) return;

//     try {
//       const userDocRef = doc(firestore, "users", user.uid);

//       await updateDoc(userDocRef, {
//         profileName: userName,
//         bio: userBio,
//       });

//       if (userEmail && user.email !== userEmail) {
//         // Re-authenticate the user before updating the email
//         const credential = EmailAuthProvider.credential(
//           user.email!,
//           prompt("Enter your current password:")!
//         );
//         await reauthenticateWithCredential(user, credential);
//         await updateEmail(user, userEmail);
//       }

//       if (imageFile) {
//         await handleImageUpload(imageFile); // Handle image upload
//       }

//       setIsEditing(false);
//       toast.success("Profile updated successfully!", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setErrorMessage("Failed to update profile. Please try again.");

//       // Clear the error message after 5 seconds
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 5000);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchUserProfile(currentUser);
//       } else {
//         setUser(null);
//         setUserName(null);
//         setUserEmail(null);
//         setUserBio(null);
//         router.push("/login"); // Redirect to login if not authenticated
//       }
//     });

//     // Cleanup the subscription on unmount
//     return () => unsubscribe();
//   }, [auth, firestore, router]);

//   return (
//     <DashboardLayout>
//       <div className="bg-[rgba(50,132,255,0.14)] rounded-md ">
//         <h1 className="flex justify-center pt-4">Profile</h1>
//         <div className="flex justify-center">
//           {isEditing ? (
//             <div className="flex flex-col w-64 gap-4">
//               <div className="flex justify-center flex-col gap-4">
//                 <label className="">
//                   Name:
//                   <input
//                     className="border border-blue-400 p-2 rounded-md active:border-blue-500"
//                     type="text"
//                     value={userName || ""}
//                     onChange={(e) => setUserName(e.target.value)}
//                   />
//                 </label>

//                 <label className="">
//                   Email:
//                   <input
//                     className="border border-blue-400 p-2 rounded-md"
//                     type="email"
//                     value={userEmail || ""}
//                     onChange={(e) => setUserEmail(e.target.value)}
//                   />
//                 </label>

//                 <label className="flex flex-col">
//                   Bio:
//                   <textarea
//                     className="border border-blue-400 rounded-md active:border-blue-500"
//                     value={userBio || ""}
//                     onChange={(e) => setUserBio(e.target.value)}
//                   />
//                 </label>

//                 <label className="flex flex-col">
//                   Profile Image:
//                   <input
//                     className="border border-blue-400 rounded-md active:border-blue-500 p-2"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setImageFile(e.target.files?.[0] || null)}
//                   />
//                 </label>
//               </div>

//               <div className="flex gap-2 justify-center pb-4">
//                 <button
//                   className="border border-blue-500 rounded-md p-4"
//                   onClick={updateUserProfile}
//                 >
//                   Save changes
//                 </button>

//                 <button
//                   className="border border-blue-500 rounded-md p-4"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col justify-center gap-4 p-10 w-76">
//               <div className="flex flex-col items-center">
//                 {profileImage && (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="w-24 h-24 rounded-full mb-4"
//                   />
//                 )}
//                 <div className="flex flex-col">
//                   <span>Name:</span>
//                   <p className="border border-gray-500">{userName}</p>
//                 </div>

//                 <div className="flex flex-col">
//                   <span>Email:</span>
//                   <p className="border border-gray-500">{userEmail}</p>
//                 </div>

//                 <div className="flex flex-col">
//                   <span>Bio:</span>
//                   <p className="border border-gray-500">{userBio}</p>
//                 </div>
//               </div>

//               <button
//                 className="border border-blue-500 rounded-md p-4"
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </button>
//             </div>
//           )}
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//           <ToastContainer
//             position="top-center"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default DashboardProfile;




