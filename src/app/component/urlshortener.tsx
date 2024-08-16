"use client";

import React, { useState, useEffect, useRef } from "react";

import QRCode from "qrcode.react";
import { toPng, toJpeg, toSvg, toCanvas } from "html-to-image"; 
import { shortenUrl } from "../api/shorten";
import { FiLink, FiLink2 } from "react-icons/fi";
import {
  PiMagicWandFill,
  PiMagicWandLight,
  PiQrCodeFill,
} from "react-icons/pi";
import Dropdown from "./Dropdown";
import {
  FaTwitter,
  FaLinkedin,
  FaShare,
  FaTelegram,
  FaTimes,
} from "react-icons/fa";
import {
  IoLogoWhatsapp,
  IoIosMail,
  IoIosCopy,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { TfiSharethis } from "react-icons/tfi";

interface UrlShortenerProps {
  onUrlShortened: (newShortUrl: string) => void;
}

// const UrlShortener = (  ) =>
  
const UrlShortener: React.FC<UrlShortenerProps> = ({ onUrlShortened }) => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false); 
  const [downloadFormat, setDownloadFormat] = useState("png"); // State to manage download format
  const qrCodeRef = useRef<HTMLDivElement>(null); // Ref for the QR code div

  const socialItems = [
    {
      name: "WhatsApp",
      icon: <IoLogoWhatsapp />,
      url: "https://api.whatsapp.com/send?text=",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: "https://twitter.com/intent/tweet?url=",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/sharing/share-offsite/?url=",
    },
    {
      name: "Telegram",
      icon: <FaTelegram />,
      url: "https://t.me/share/url?url=",
    },
    {
      name: "Email",
      icon: <IoIosMail />,
      url: "mailto:?subject=Check+out+this+shortened+URL&body=",
    },
  ];

  useEffect(() => {
    const storedShortUrl = localStorage.getItem("shortUrl");
    if (storedShortUrl) setShortUrl(storedShortUrl);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess("");
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

      onUrlShortened(shortenedUrl);

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
          setCopySuccess("Copied to clipboard!");
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
    setShowQRCode(false); // Reset QR code visibility
  };

  const handleDownloadQRCode = () => {
    if (qrCodeRef.current) {
      let downloadFunction;
      let mimeType;
      switch (downloadFormat) {
        case "jpeg":
          downloadFunction = toJpeg;
          mimeType = "image/jpeg";
          break;
        case "svg":
          downloadFunction = toSvg;
          mimeType = "image/svg+xml";
          break;
        case "canvas":
          downloadFunction = toCanvas;
          mimeType = "image/png"; // Canvas doesn't have a specific mimeType
          break;
        case "png":
        default:
          downloadFunction = toPng;
          mimeType = "image/png";
          break;
      }

      downloadFunction(qrCodeRef.current)
        .then((dataUrl) => {
          // Convert data URL to Blob
          fetch(dataUrl as string)
            .then((res) => res.blob())
            .then((blob) => {
              // Create a temporary URL for the Blob
              const url = URL.createObjectURL(blob);

              // Create a link element and set its href to the Blob URL
              const link = document.createElement("a");
              link.href = url;
              link.download = `qrcode.${downloadFormat}`;

              // Append link to the DOM, click it, and then remove it
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);

              // Revoke the Blob URL to release memory
              URL.revokeObjectURL(url);
            })
            .catch((err) => {
              console.error("Failed to convert data URL to Blob", err);
            });
        })
        .catch((err) => {
          console.error("Failed to download QR code", err);
        });
    }
  };

  

 const handleShareQRCodeAsSVG = async () => {
    if (qrCodeRef.current) {
      try {
        // Convert QR code to SVG data URL
        const dataUrl = await toSvg(qrCodeRef.current);
  
        // Convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
  
        // Use the Web Share API if available
        if (navigator.share) {
          await navigator.share({
            title: "QR Code",
            text: "Scan this QR code to visit the shortened URL",
            files: [new File([blob], "qrcode.svg", { type: "image/svg+xml" })],
          });
        } else {
          console.warn("Web Share API is not supported in this browser.");
        }
      } catch (err) {
        console.error("Failed to share QR code as SVG", err);
      }
    }
  };
  




  return (



    <div className="w-full max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg shadow-lg">
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white">
      <label
        htmlFor="longUrl"
        className="bg-white flex items-center gap-2 text-xl font-medium "
      >
        {isShortened ? (
          <FiLink2 className="text-2xl bg-white" />
        ) : (
          <FiLink className="text-2xl bg-white" />
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
        className="w-full text-deep-teal rounded-xl px-4 py-2 mt-2 border border-gray-300 outline-none focus:border-teal-500 focus:ring-teal-500 transition"
        readOnly={isShortened}
      />
      <label
        htmlFor="customAlias"
        className="flex items-center gap-2 text-xl font-medium bg-white"
      >
        {isShortened ? (
          <PiMagicWandLight className="text-2xl bg-white" />
        ) : (
          <PiMagicWandFill className="text-2xl bg-white" />
        )}
        {isShortened ? "Slashed URL" : "Customize your link"}
      </label>
      <div
        className={`w-full bg-white ${isShortened ? "" : "flex flex-col md:flex-row gap-2"}`}
      >
        {!isShortened && (
          <select
            name="domain"
            className="w-full md:w-3/5 rounded-xl px-4 py-2 mt-2 border border-gray-300 outline-none bg-white text-black focus:border-teal-500 focus:ring-teal-500 transition"
          >
            <option value="tiny.one">tiny.one</option>
          </select>
        )}
        <span className="relative w-full bg-white">
          <input
            type="text"
            placeholder={isShortened ? "Shortened URL" : "Enter custom name"}
            id="customAlias"
            value={isShortened ? shortUrl : customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className={`w-full text-deep-teal rounded-xl px-4 py-2 mt-2 border border-gray-300 outline-none focus:border-teal-500 focus:ring-teal-500 transition ${
              error ? "border-red-500" : ""
            }`}
            readOnly={isShortened} // Make the input read-only if URL is shortened
          />
          {error && (
            <p className="text-red-600 absolute text-xs bottom-0 transform translate-y-full mt-1">
              {error}
            </p>
          )}
        </span>
      </div>
  
      {isShortened && (
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            type="button"
            onClick={handleVisit}
            className="dropdown-button"
          >
            <FaShare />
          </button>
          <button
            type="button"
            onClick={() => setShowQRCode(!showQRCode)}
            className="dropdown-button"
          >
            <PiQrCodeFill />
            <p className="hidden md:block">QR</p>
          </button>
  
          <Dropdown
            icons={<TfiSharethis />}
            label="Share"
            socials={socialItems.map((item) => ({
              ...item,
              url: item.url + encodeURIComponent(shortUrl),
            }))}
          />
  
          <button
            type="button"
            onClick={handleCopy}
            className="dropdown-button"
          >
            <IoIosCopy />
            <p className="hidden md:block">Copy</p>
          </button>
          {copySuccess && (
            <div className="w-44 p-2 bg-deep-teal border-l-8 border-teal-600 space-y-1 fixed top-7 right-2 z-50">
              <button
                onClick={() => setCopySuccess("")}
                className="absolute right-2 top-4 text-teal-950"
              >
                <FaTimes />
              </button>
              <p className="flex items-center gap-1 text-xs">
                <IoMdCheckmarkCircle /> success
              </p>
              <p className="text-xs">{copySuccess}</p>
            </div>
          )}
        </div>
      )}
  
      <button
        type="submit"
        className="w-full py-3 px-4 mt-4 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-600 transition"
      >
        {isShortened ? "Trim Another" : "Trim URL"}
      </button>
    </form>
  
    {isShortened && shortUrl && showQRCode && (

      <div className="mt-4 flex flex-col items-center bg-white">
        <div ref={qrCodeRef} className="p-2 bg-white rounded-xl">
          <QRCode value={shortUrl} size={120} />
        </div>

        <p className="mt-2 text-xs text-gray-600 bg-white">
          Scan this QR code to visit the shortened URL
        </p>

        <div className="flex flex-col items-center gap-2 mt-2">

          <div className="flex items-center gap-2 bg-white">
            <select
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value)}
              className="w-full md:w-auto rounded-xl px-3 py-2 border border-gray-300 outline-none text-black bg-white focus:border-teal-500 focus:ring-teal-500 transition"
            >
              <option value="svg">SVG</option>
            </select>

            <button
              onClick={handleDownloadQRCode}
              className="py-2 px-4 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition"
            >
              Download QR Code
            </button>
          </div>
          <button
            onClick={handleShareQRCodeAsSVG}
            className="py-2 px-4 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 transition p-4  "
          >
            Share QR Code
          </button>
        </div>
      </div>
    )}
  </div>
  

  );
};

export default UrlShortener;






