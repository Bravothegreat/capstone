
// "use client";

// // import UrlShortener from "../component/urlshortener";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth, firestore } from "../firebase/firebase";
// import type { User } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import UrlShortener from "../component/urlshortener";

// export default function Dashboard() {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();
//   const [username, setUserName] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

 

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         const userDoc = await getDoc(doc(firestore, "user", user.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setUserName(`${userData.firstName} ${userData.lastName}`);
//         }
//       } else {
//         router.push("/signin");
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [router]);

  



//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push("/signin");
//     } catch (error) {
//       return error;
//       console.error("Logout error:", error);
//     }
//   };

//   if (loading) {
//     return <div className="main-load">
//        <div className="loader">
//     <div className="circle"></div>
//     <div className="circle"></div>
//     <div className="circle"></div>
//     <div className="circle"></div>
//    </div>
//     </div>
  
// ;
//   }

//   return (
//     <>
//      <div className="">
//      <div> Dashboard</div>
//       <main className="dashboard">
//         {username && <h1> Welcome, {username}!</h1>}

          
      


//         <button onClick={handleLogout}> Logout</button>
//         <UrlShortener />
     
//       </main>
//      </div>
//     </>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import UrlShortener from "../component/urlshortener";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData?.profileName);
        }
      } else {
        router.push("/signin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("logout error:", error);
    }
  };

  if (loading) {
    return <div className="main-load">
         <div className="loader">
       <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        </div>
        </div>
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Dashboard</h1>
     <main className="dashboard">
     {userName && <p>Welcome, {userName}!</p>}
      
      <button
        className=""
        onClick={handleLogout}
      >
        Logout
      </button>
      <UrlShortener />
     </main>
    </div>
  );
};

export default Dashboard;
