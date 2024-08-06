



"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import UrlShortener from "../component/urlshortener";

export default function Dashboard ()  {
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
      return error
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


