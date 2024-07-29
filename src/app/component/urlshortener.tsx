"use client"

import { useState} from "react";
import {firestore} from "../firebase/firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import {nanoid} from "nanoid";
import QRCode from "qrcode.react";

export default function UrlShortener () {
  const [url,setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if ( url.trim()) {
      const slug = customSlug || nanoid(6)
      const docRef = doc(firestore, "urls", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert("slug already in use. Please choose another");
      } else {
        await addDoc(collection(firestore, "urls"), {
          originalUrl: url,
          slug: slug,
        });
        setShortUrl(`${window.location.origin}/${slug}`);
        setUrl("");
        setCustomSlug("");
      }
    }
  };

  return (
    <>
    <div>
      <h1>URL Shortener</h1>
      
      <div className="shortner-div" >
         
      <div className="input-group">
      <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder=""
          className="input-group_input"
        />
        <label className="input-group_label">
           Enter URL
           </label>
      </div>

        <div className="input-group">
        <input
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder=""
          className="input-group_input"
        />
         <label className="input-group_label">
          Custom Slug
          </label>
        </div>

        <button onClick={handleShorten}>Shorten</button>
       
        {shortUrl && (
        <div>
          <p>QR CODE</p>
          <a href={shortUrl}>{shortUrl}</a>
          <div>
            <QRCode value={shortUrl} />
          </div>
         
        </div>
          
       )}
       
      </div>
    </div>
    </>
  )

}