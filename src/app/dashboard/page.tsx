

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";
import DashboardLayout from "../component/DashboardLayout";
import UrlShortener from "../component/urlshortener";
import Markdown from "../component/Markdown";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [editableMarkdown, setEditableMarkdown] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData?.profileName || "");
           // Default to empty string if profileName is not set
          setEditableMarkdown(userData?.markdownContent || ""); // Load user's markdown content
          setShortUrl(userData?.shortUrl || ""); // Load user's shortened URL
        }
      } else {
        router.push("/signin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleMarkdownSave = async () => {
    if (user) {
      try {
        const userDocRef = doc(firestore, "users", user.uid);
        await updateDoc(userDocRef, {
          markdownContent: editableMarkdown, // Save updated markdown content
          shortUrl, // Save updated shortened URL
        });
        alert("Markdown and URL saved successfully!");
      } catch (error) {
        console.error("Failed to save markdown and URL:", error);
        alert("Failed to save markdown and URL. Please try again.");
      }
    }
  };

  const handleUrlShortened = (newShortUrl: string) => {
    setShortUrl(newShortUrl);
    setEditableMarkdown((prevMarkdown) => `${prevMarkdown}\n[Link](${newShortUrl})`);
  };

  if (loading) {
    return (
      <div className="main-load">
        <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="mt-12">
        {/* <h1 className="font-bold text-base mb-4">Welcome, {userName}</h1> */}

        <UrlShortener onUrlShortened={handleUrlShortened} />
        <Markdown content={editableMarkdown} onSave={handleMarkdownSave} />
 

      </div>
     

    </DashboardLayout>
  );
}


