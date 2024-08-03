// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FaDownload } from "react-icons/fa";
// import QRCode from "qrcode.react";
// import { toPng } from "html-to-image"; // Import the html-to-image library
// import { shortenUrl } from "../api/shorten";
// import { FiLink, FiLink2 } from "react-icons/fi";
// import {
//   PiMagicWandFill,
//   PiMagicWandLight,
//   PiQrCodeFill,
// } from "react-icons/pi";
// import Dropdown from "./Dropdown";
// import {
//   FaTwitter,
//   FaLinkedin,
//   FaShare,
//   FaTelegram,
//   FaTimes,
// } from "react-icons/fa";
// import {
//   IoLogoWhatsapp,
//   IoIosMail,
//   IoIosCopy,
//   IoMdCheckmarkCircle,
// } from "react-icons/io";
// import { TfiSharethis } from "react-icons/tfi";

// const UrlShortener = () => {
//   const [longUrl, setLongUrl] = useState("");
//   const [customAlias, setCustomAlias] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [copySuccess, setCopySuccess] = useState("");
//   const [isShortened, setIsShortened] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false); // State to manage QR code visibility
//   const qrCodeRef = useRef<HTMLDivElement>(null); // Ref for the QR code div

//   const socialItems = [
//     {
//       name: "WhatsApp",
//       icon: <IoLogoWhatsapp />,
//       url: "https://api.whatsapp.com/send?text=",
//     },
//     {
//       name: "Twitter",
//       icon: <FaTwitter />,
//       url: "https://twitter.com/intent/tweet?url=",
//     },
//     {
//       name: "LinkedIn",
//       icon: <FaLinkedin />,
//       url: "https://www.linkedin.com/sharing/share-offsite/?url=",
//     },
//     {
//       name: "Telegram",
//       icon: <FaTelegram />,
//       url: "https://t.me/share/url?url=",
//     },
//     {
//       name: "Email",
//       icon: <IoIosMail />,
//       url: "mailto:?subject=Check+out+this+shortened+URL&body=",
//     },
//   ];

//   useEffect(() => {
//     const storedShortUrl = localStorage.getItem("shortUrl");
//     if (storedShortUrl) setShortUrl(storedShortUrl);
//   }, []);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (copySuccess) {
//       timer = setTimeout(() => {
//         setCopySuccess("");
//       }, 3000); // 3000 milliseconds = 3 seconds
//     }
//     return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or copySuccess changes
//   }, [copySuccess]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isShortened) {
//       handleReset();
//       return;
//     }
//     setError("");
//     setCopySuccess("");
//     try {
//       const shortenedUrl = await shortenUrl(longUrl, customAlias);
//       setShortUrl(shortenedUrl);
//       localStorage.setItem("shortUrl", shortenedUrl);
//       setIsShortened(true);
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       setError((err as Error)?.message || "");
//       setIsShortened(false); // Ensure isShortened is false when there is an error
//     }
//   };

//   const handleCopy = () => {
//     if (shortUrl) {
//       navigator.clipboard.writeText(shortUrl).then(
//         () => {
//           setCopySuccess("Copied to clipboard!");
//         },
//         (err) => {
//           setCopySuccess("Failed to copy URL.");
//         }
//       );
//     }
//   };

//   const handleVisit = () => {
//     window.open(shortUrl, "_blank");
//   };

//   const handleReset = () => {
//     setLongUrl("");
//     setCustomAlias("");
//     setShortUrl("");
//     setError(null);
//     setCopySuccess("");
//     setIsShortened(false);
//     setShowQRCode(false); // Reset QR code visibility
//   };

//   const handleDownloadQRCode = () => {
//     if (qrCodeRef.current) {
//       toPng(qrCodeRef.current)
//         .then((dataUrl) => {
//           const link = document.createElement("a");
//           link.href = dataUrl;
//           link.download = "qrcode.png";
//           link.click();
//         })
//         .catch((err) => {
//           console.error("Failed to download QR code", err);
//         });
//     }
//   };

//   return (
//     <div className="shortner-div">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <label
//           htmlFor="longUrl"
//           className="flex items-center gap-2 text-xl font-nuno font-normal"
//         >
//           {isShortened ? (
//             <FiLink2 className="text-2xl" />
//           ) : (
//             <FiLink className="text-2xl" />
//           )}
//           {isShortened ? "Your Long URL" : "Shorten a long URL"}
//         </label>
//         <input
//           type="text"
//           placeholder="Enter long URL"
//           id="longUrl"
//           value={longUrl}
//           onChange={(e) => setLongUrl(e.target.value)}
//           required
//           className="w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none"
//           readOnly={isShortened}
//         />
//         <label
//           htmlFor="customAlias"
//           className="flex items-center gap-2 text-xl font-nuno font-normal"
//         >
//           {isShortened ? (
//             <PiMagicWandLight className="text-2xl" />
//           ) : (
//             <PiMagicWandFill className="text-2xl" />
//           )}
//           {isShortened ? "Snipped URL" : "Customize your link"}
//         </label>
//         <div
//           className={`w-full ${
//             isShortened ? "" : "flex flex-col md:flex-row gap-2"
//           }`}
//         >
//           {!isShortened && (
//             <select
//               name="domain"
//               className="w-full md:w-3/5 rounded-xl px-3 py-2 mt-2 mb-2 outline-none text-black bg-white"
//             >
//               <option value="tiny.one">tiny.one</option>
//             </select>
//           )}
//           <span className="relative w-full">
//             <input
//               type="text"
//               placeholder={isShortened ? "Shortened URL" : "Enter custom name"}
//               id="customAlias"
//               value={isShortened ? shortUrl : customAlias}
//               onChange={(e) => setCustomAlias(e.target.value)}
//               className={`w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none ${
//                 error ? "input-error" : ""
//               }`}
//               readOnly={isShortened} // Make the input read-only if URL is shortened
//             />
//             {error && (
//               <p className="text-red-600 absolute text-xs bottom">{error}</p>
//             )}
//           </span>
//         </div>

//         {isShortened && (
//           <div className="flex gap-2 mt-4">
//             <button
//               type="button"
//               onClick={handleVisit}
//               className="bg-transparent text-soft-orange border-soft-orange border font-semibold py-2 px-4 rounded"
//             >
//               <FaShare />
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowQRCode(!showQRCode)} // Toggle QR code visibility
//               className="bg-soft-orange text-white font-semibold py-2 px-4 rounded inline-flex items-center gap-2"
//             >
//               <PiQrCodeFill />
//               <p className="hidden md:block">QR</p>
//             </button>

//             <Dropdown
//               icons={<TfiSharethis />}
//               label="Share"
//               socials={socialItems.map((item) => ({
//                 ...item,
//                 url: item.url + encodeURIComponent(shortUrl),
//               }))}
//             />

//             <button
//               type="button"
//               onClick={handleCopy}
//               className="bg-deep-teal text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
//             >
//               <IoIosCopy />
//               <p className="hidden md:block">Copy</p>
//             </button>
//             {copySuccess && (
//               <div className="w-44 p-2 bg-deep-teal border-l-8 border-teal-600 space-y-1 fixed top-7 right-2 z-50">
//                 <button
//                   onClick={() => setCopySuccess("")}
//                   className="absolute right-2 top-4 text-teal-950"
//                 >
//                   <FaTimes />
//                 </button>

//                 <p className="flex items-center gap-1 text-xs">
//                   <IoMdCheckmarkCircle /> success
//                 </p>
//                 <p className="text-xs">{copySuccess}</p>
//               </div>
//             )}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full text-xl font-bold font-ubuntu rounded-xl px-3 py-2 mt-6 text-center bg-deep-teal text-light-gray transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-md active:bg-opacity-100 active:scale-95"
//         >
//           {isShortened ? "Trim Another" : "Trim URL"}
//         </button>
//       </form>

//       {isShortened &&
//         shortUrl &&
//         showQRCode && ( // Conditionally render QR code based on showQRCode state
//           <div className="mt-4 flex flex-col items-center">
//             <div ref={qrCodeRef}>
//               <QRCode value={shortUrl} size={120} />
//             </div>
//             <p className="mt-2 text-xs text-gray-600">
//               Scan this QR code to visit the shortened URL
//             </p>
//             <button
//               onClick={handleDownloadQRCode}
//               className="bg-deep-teal text-white font-semibold py-2 px-4 rounded mt-2"
//             >
//               Download QR Code
//             </button>
//           </div>
//         )}
//     </div>
//   );
// };

// export default UrlShortener;




// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import QRCode from "qrcode.react";
// import { toPng } from "html-to-image";
// import { shortenUrl } from "../api/shorten";
// import { FiLink, FiLink2 } from "react-icons/fi";
// import { PiMagicWandFill, PiMagicWandLight, PiQrCodeFill } from "react-icons/pi";
// import Dropdown from "./Dropdown";
// import { FaTwitter, FaLinkedin, FaShare, FaTelegram, FaTimes, FaDownload } from "react-icons/fa";
// import { IoLogoWhatsapp, IoIosMail, IoIosCopy, IoMdCheckmarkCircle } from "react-icons/io";
// import { TfiSharethis } from "react-icons/tfi";

// const UrlShortener = () => {
//   const [longUrl, setLongUrl] = useState("");
//   const [customAlias, setCustomAlias] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [copySuccess, setCopySuccess] = useState("");
//   const [isShortened, setIsShortened] = useState(false);
//   const [showQRCode, setShowQRCode] = useState(false); // State to manage QR code visibility
//   const qrCodeRef = useRef<HTMLDivElement>(null); // Ref for the QR code div

//   const socialItems = [
//     { name: "WhatsApp", icon: <IoLogoWhatsapp />, url: "https://api.whatsapp.com/send?text=" },
//     { name: "Twitter", icon: <FaTwitter />, url: "https://twitter.com/intent/tweet?url=" },
//     { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
//     { name: "Telegram", icon: <FaTelegram />, url: "https://t.me/share/url?url=" },
//     { name: "Email", icon: <IoIosMail />, url: "mailto:?subject=Check+out+this+shortened+URL&body=" },
//   ];

//   useEffect(() => {
//     const storedShortUrl = localStorage.getItem("shortUrl");
//     if (storedShortUrl) setShortUrl(storedShortUrl);
//   }, []);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (copySuccess) {
//       timer = setTimeout(() => {
//         setCopySuccess("");
//       }, 3000); // 3000 milliseconds = 3 seconds
//     }
//     return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or copySuccess changes
//   }, [copySuccess]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isShortened) {
//       handleReset();
//       return;
//     }
//     setError("");
//     setCopySuccess("");
//     try {
//       const shortenedUrl = await shortenUrl(longUrl, customAlias);
//       setShortUrl(shortenedUrl);
//       localStorage.setItem("shortUrl", shortenedUrl);
//       setIsShortened(true);
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       setError((err as Error)?.message || "");
//       setIsShortened(false); // Ensure isShortened is false when there is an error
//     }
//   };

//   const handleCopy = () => {
//     if (shortUrl) {
//       navigator.clipboard.writeText(shortUrl).then(
//         () => {
//           setCopySuccess("Copied to clipboard!");
//         },
//         (err) => {
//           setCopySuccess("Failed to copy URL.");
//         }
//       );
//     }
//   };

//   const handleVisit = () => {
//     window.open(shortUrl, "_blank");
//   };

//   const handleReset = () => {
//     setLongUrl("");
//     setCustomAlias("");
//     setShortUrl("");
//     setError(null);
//     setCopySuccess("");
//     setIsShortened(false);
//     setShowQRCode(false); // Reset QR code visibility
//   };

//   const handleDownloadQRCode = () => {
//     if (qrCodeRef.current) {
//       toPng(qrCodeRef.current)
//         .then((dataUrl) => {
//           const link = document.createElement("a");
//           link.href = dataUrl;
//           link.download = "qrcode.png";
//           link.click();
//         })
//         .catch((err) => {
//           console.error("Failed to download QR code", err);
//         });
//     }
//   };

//   const handleShareQRCode = () => {
//     if (qrCodeRef.current) {
//       toPng(qrCodeRef.current)
//         .then((dataUrl) => {
//           const file = new File([dataUrl], "qrcode.png", { type: "image/png" });
//           const shareData = {
//             title: "QR Code",
//             text: "Scan this QR code to visit the shortened URL",
//             files: [file],
//           };
//           navigator.share(shareData)
//             .then(() => console.log("QR Code shared successfully"))
//             .catch((err) => console.error("Error sharing QR Code", err));
//         })
//         .catch((err) => {
//           console.error("Failed to generate QR code image", err);
//         });
//     }
//   };

//   return (
//     <div className="shortner-div">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//         <label htmlFor="longUrl" className="flex items-center gap-2 text-xl font-nuno font-normal">
//           {isShortened ? <FiLink2 className="text-2xl" /> : <FiLink className="text-2xl" />}
//           {isShortened ? "Your Long URL" : "Shorten a long URL"}
//         </label>
//         <input
//           type="text"
//           placeholder="Enter long URL"
//           id="longUrl"
//           value={longUrl}
//           onChange={(e) => setLongUrl(e.target.value)}
//           required
//           className="w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none"
//           readOnly={isShortened}
//         />
//         <label htmlFor="customAlias" className="flex items-center gap-2 text-xl font-nuno font-normal">
//           {isShortened ? <PiMagicWandLight className="text-2xl" /> : <PiMagicWandFill className="text-2xl" />}
//           {isShortened ? "Snipped URL" : "Customize your link"}
//         </label>
//         <div className={`w-full ${isShortened ? "" : "flex flex-col md:flex-row gap-2"}`}>
//           {!isShortened && (
//             <select name="domain" className="w-full md:w-3/5 rounded-xl px-3 py-2 mt-2 mb-2 outline-none text-black bg-white">
//               <option value="tiny.one">tiny.one</option>
//             </select>
//           )}
//           <span className="relative w-full">
//             <input
//               type="text"
//               placeholder={isShortened ? "Shortened URL" : "Enter custom name"}
//               id="customAlias"
//               value={isShortened ? shortUrl : customAlias}
//               onChange={(e) => setCustomAlias(e.target.value)}
//               className={`w-full text-deep-teal rounded-xl px-3 py-2 mt-2 mb-2 outline-none ${error ? "input-error" : ""}`}
//               readOnly={isShortened} // Make the input read-only if URL is shortened
//             />
//             {error && <p className="text-red-600 absolute text-xs bottom">{error}</p>}
//           </span>
//         </div>

//         {isShortened && (
//           <div className="flex gap-2 mt-4">
//             <button
//               type="button"
//               onClick={handleVisit}
//               className="bg-transparent text-soft-orange border-soft-orange border font-semibold py-2 px-4 rounded"
//             >
//               <FaShare />
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowQRCode(!showQRCode)} // Toggle QR code visibility
//               className="bg-soft-orange text-white font-semibold py-2 px-4 rounded inline-flex items-center gap-2"
//             >
//               <PiQrCodeFill />
//               <p className="hidden md:block">QR</p>
//             </button>

//             <Dropdown
//               icons={<TfiSharethis />}
//               label="Share"
//               socials={socialItems.map((item) => ({
//                 ...item,
//                 url: item.url + encodeURIComponent(shortUrl),
//               }))}
//             />

//             <button
//               type="button"
//               onClick={handleCopy}
//               className="bg-deep-teal text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
//             >
//               <IoIosCopy />
//               <p className="hidden md:block">Copy</p>
//             </button>
//             {copySuccess && (
//               <div className="w-44 p-2 bg-deep-teal border-l-8 border-teal-600 space-y-1 fixed top-7 right-2 z-50">
//                 <button
//                   onClick={() => setCopySuccess("")}
//                   className="absolute right-2 top-4 text-teal-950"
//                 >
//                   <FaTimes />
//                 </button>

//                 <p className="flex items-center gap-1 text-xs">
//                   <IoMdCheckmarkCircle /> success
//                 </p>
//                 <p className="text-xs">{copySuccess}</p>
//               </div>
//             )}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full text-xl font-bold font-ubuntu rounded-xl px-3 py-2 mt-6 text-center bg-deep-teal text-light-gray transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-md active:bg-opacity-100 active:scale-95"
//         >
//           {isShortened ? "Trim Another" : "Trim URL"}
//         </button>
//       </form>

//       {isShortened && shortUrl && showQRCode && ( // Conditionally render QR code based on showQRCode state
//         <div className="mt-4 flex flex-col items-center">
//           <div ref={qrCodeRef}>
//             <QRCode value={shortUrl} size={120} />
//           </div>
//           <p className="mt-2 text-xs text-gray-600">
//             Scan this QR code to visit the shortened URL
//           </p>
//           <button
//             onClick={handleDownloadQRCode}
//             className="bg-deep-teal text-white font-semibold py-2 px-4 rounded mt-2 flex gap-2 align-center"
//           >
//             <FaDownload />
//             Download QR Code
//           </button>
//           <button
//             onClick={handleShareQRCode}
//             className="bg-deep-teal text-white font-semibold py-2 px-4 rounded mt-2 flex gap-2 align-center "
//           >
//             <FaShare />
//             Share QR Code
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UrlShortener;









 "use client";

import React, { useState, useEffect, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import QRCode from "qrcode.react";
import { toPng, toJpeg, toSvg, toCanvas } from "html-to-image"; // Import the html-to-image library
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

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false); // State to manage QR code visibility
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
          mimeType = "image/png"; // Canvas doesn't have a mimeType, but it's often used as PNG
          break;
        case "png":
        default:
          downloadFunction = toPng;
          mimeType = "image/png";
          break;
      }

      downloadFunction(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `qrcode.${downloadFormat}`;
          link.click();
        })
        .catch((err) => {
          console.error("Failed to download QR code", err);
        });
    }
  };




       

  const handleShareQRCode = async () => {
    if (qrCodeRef.current) {
      try {
        // Convert QR code to PNG data URL
        const dataUrl = await toPng(qrCodeRef.current);
        
        // Convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
  
        // Use the Web Share API if available
        if (navigator.share) {
          await navigator.share({
            title: "QR Code",
            text: "Scan this QR code to visit the shortened URL",
            files: [new File([blob], 'qrcode.png', { type: 'image/png' })],
          });
        } else {
          console.warn("Web Share API is not supported in this browser.");
        }
      } catch (err) {
        console.error("Failed to share QR code", err);
      }
    }
  };
  

   
          

  
     

  return (
    <div className="shortner-div">
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
          {isShortened ? (
            <PiMagicWandLight className="text-2xl" />
          ) : (
            <PiMagicWandFill className="text-2xl" />
          )}
          {isShortened ? "Snipped URL" : "Customize your link"}
        </label>
        <div
          className={`w-full ${isShortened ? "" : "flex flex-col md:flex-row gap-2"}`}
        >
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

        {isShortened && (
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleVisit}
              className="bg-transparent text-soft-orange border-soft-orange border font-semibold py-2 px-4 rounded"
            >
              <FaShare />
            </button>
            <button
              type="button"
              onClick={() => setShowQRCode(!showQRCode)} // Toggle QR code visibility
              className="bg-soft-orange text-white font-semibold py-2 px-4 rounded inline-flex items-center gap-2"
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
              className="bg-deep-teal text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
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
          className="w-full text-xl font-bold font-ubuntu rounded-xl px-3 py-2 mt-6 text-center bg-deep-teal text-light-gray transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-md active:bg-opacity-100 active:scale-95"
        >
          {isShortened ? "Trim Another" : "Trim URL"}
        </button>
      </form>

      {isShortened &&
        shortUrl &&
        showQRCode && ( // Conditionally render QR code based on showQRCode state
          <div className="mt-4 flex flex-col items-center">
            <div ref={qrCodeRef}>
              <QRCode value={shortUrl} size={120} />
            </div>
            <p className="mt-2 text-xs text-gray-600">
              Scan this QR code to visit the shortened URL
            </p>
            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="flex items-center gap-2">
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value)}
                  className="w-full md:w-auto rounded-xl px-3 py-2 outline-none text-black bg-white"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                  <option value="canvas">Canvas</option>
                </select>
                <button
                  onClick={handleDownloadQRCode}
                  className="bg-deep-teal text-white font-semibold py-2 px-4 rounded"
                >
                  Download QR Code
                </button>
              </div>
              <button
                onClick={handleShareQRCode}
                className="bg-deep-teal text-white font-semibold py-2 px-4 rounded"
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
