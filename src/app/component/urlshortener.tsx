
"use client"

import { useState, useEffect } from "react";
import { shortenUrl } from "../api/shorten";
import { FiLink, FiLink2 } from "react-icons/fi";
import { PiMagicWandFill, PiMagicWandLight, PiQrCodeFill } from "react-icons/pi";

import {
  FaTwitter,
  FaLinkedin,
  FaShare,
  FaTelegram,
  FaTimes
} from "react-icons/fa";
import { IoLogoWhatsapp, IoIosMail, IoIosCopy, IoMdCheckmarkCircle } from "react-icons/io";
import { TfiSharethis } from "react-icons/tfi";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [isShortened, setIsShortened] = useState(false);

  const socialItems = [
    { name: "WhatsApp", icon: <IoLogoWhatsapp />, url: "https://api.whatsapp.com/send?text=" },
    { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/intent/tweet?url=" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "Telegram", icon: <FaTelegram />, url: "https://t.me/share/url?url=" },
    { name: "Email", icon: <IoIosMail />, url: "mailto:?subject=Check+out+this+shortened+URL&body=" },
  ];

  useEffect(() => {
    const storedShortUrl = localStorage.getItem("shortUrl");
    if (storedShortUrl) setShortUrl(storedShortUrl);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess('');
      }, 3000); // 3000 milliseconds = 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or copySuccess changes
  }, [copySuccess]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isShortened) {
      handleReset();
      return;
    }
    setError("");
    setCopySuccess("");
    try {
      const shortenedUrl = await shortenUrl(longUrl, customAlias);
      setShortUrl(shortenedUrl);
      localStorage.setItem("shortUrl", shortenedUrl);
      setIsShortened(true);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError((err as Error)?.message || "");
      setIsShortened(false); // Ensure isShortened is false when there is an error
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl).then(
        () => {
          setCopySuccess("copied to clipboard!");
        },
        (err) => {
          setCopySuccess("Failed to copy URL.");
        }
      );
    }
  };

  const handleVisit = () => {
    window.open(shortUrl, "_blank");
  };

  const handleReset = () => {
    setLongUrl("");
    setCustomAlias("");
    setShortUrl("");
    setError(null);
    setCopySuccess("");
    setIsShortened(false);
  };


 



  return (
    <div className="w-full md:w-[520px] bg-dark-gray text-light-gray p-4 rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label
          htmlFor="longUrl"
          className="flex items-center gap-2 text-xl font-nuno font-normal"
        >
          {isShortened ? (
            <FiLink2 className="text-2xl" />
          ) : (
            <FiLink className="text-2xl" />
          )}
          {isShortened ? "Your Long URL" : "Shorten a long URL"}
        </label>
        <input
          type="text"
          placeholder="Enter long URL"
          id="longUrl"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none"
          readOnly={isShortened}
        />
        <label
          htmlFor="customAlias"
          className="flex items-center gap-2 text-xl font-nuno font-normal"
        >
        
          {isShortened ? "Snipped URL" : "Customize your link"}
        </label>
        <div className={`w-full ${isShortened ? "" : "flex flex-col md:flex-row gap-2"}`}>
          {!isShortened && (
            <select
              name="domain"
              className="w-full md:w-3/5 rounded-xl px-3 py-2 mt-2 mb-2 outline-none text-black bg-white"
            >
              <option value="tiny.one">tiny.one</option>
            </select>
          )}
          <span className="relative w-full">
            <input
              type="text"
              placeholder={isShortened ? "Shortened URL" : "Enter custom name"}
              id="customAlias"
              value={isShortened ? shortUrl : customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className={`w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none ${
                error ? "input-error" : ""
              }`}
              readOnly={isShortened} // Make the input read-only if URL is shortened
            />
            {error && (
              <p className="text-red-600 absolute text-xs bottom">{error}</p>
            )}
          </span>
        </div>

       

        <button
          type="submit"
          className="w-full text-xl font-bold font-ubuntu rounded-xl px-3 py-2 mt-6 text-center bg-deep-teal text-light-gray transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-md active:bg-opacity-100 active:scale-95"
        >
          {isShortened ? "Snip Another" : "Snip URL"}
        </button>
      </form>
    </div>
  );
};

export default UrlShortener;
