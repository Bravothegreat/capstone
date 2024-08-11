
"use client"

import Image from "next/image";
import { useRouter} from "next/navigation";
import { useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import type { User} from "firebase/auth";
import {doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import {collection, getDocs} from "firebase/firestore";


interface urlData {
  alis: string;
  originalUrl: string;
  clickCount: number;
}


export default function Analytics () {
  const [urls, setUrls] = useState<urlData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlCollection = collection(firestore, "urls");
      const urlSnapshot = await getDocs(urlCollection);
      const urlList = urlSnapshot.docs.map((doc) => doc.data() as urlData);
      setUrls(urlList);
    };
    fetchData();
  }, []);

 
  const [user, setUser] = useState<User | string | null>(null);
  const router = useRouter();
  const [userName, setUsername] = useState<string | null>(null);
  const [loading, setLoaing] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(`${userData?.profileName}`);
        }
      } else {
        router.push("/signin");
      }
      setLoaing(false);
    });
    return () => unsubscribe();
  }, [router])

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
    <>
     <div>
      <h2>welcome on board, {userName}</h2>
      <h2>User Analytics Dashboard</h2>
      <Link href="/dashboard">Back</Link>
     </div>

     <div>
      <table>
        <thead>
          <tr>
            <th>Alias</th>
            <th>Original URL</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.alis}>
              <td>{url.alis}</td>
              <td>{url.originalUrl}</td>
              <td>{url.clickCount}</td>
            </tr>
          ))}
          </tbody>
      </table>
     </div>
   
    </>
  )

}