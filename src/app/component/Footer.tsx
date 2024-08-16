
"use client"


import React from "react";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";



const Footer: React.FC = () => {
  return (
        
    <footer className="bg-customDarkBlue text-white py-8 mr-4 p-4">

      <div className=" bg-customDarkBlue ">

        {/* Logo Section */}
        <div className=" bg-customDarkBlue ">

          <h1 className=" bg-customDarkBlue text-2xl font-bold mb-4  ">Slah It</h1>

          <h1 className="bg-customDarkBlue text-lg font-extralight mb-4 text-customColor ">
            Contact us
            </h1>

         <p className=" bg-customDarkBlue flex gap-2 items-center">
         <IoIosCall size={30} className=" bg-customDarkBlue"/>: <span className=" bg-customDarkBlue">081358969090</span>
         </p>

         <p className=" bg-customDarkBlue flex  gap-2 items-center">
         <IoIosMail size={30} className=" bg-customDarkBlue"/>: <span className=" bg-customDarkBlue">slashIt@gmail.com</span>
         </p>
         
        </div>

     
        <div className=" bg-customDarkBlue mt-4 mb-4">
        <h1 className="bg-customDarkBlue text-lg font-extralight mb-4 text-customColor ">Quick Links</h1>
          <p className="bg-customDarkBlue" >
          <Link href="/analytics" className=" bg-customDarkBlue text-sm hover:text-teal-400">
            Analytics
          </Link>
          </p>

        <p className="bg-customDarkBlue" >
        <Link href="/about" className=" bg-customDarkBlue text-sm hover:text-teal-400">
            About Us
          </Link>
        </p>

         <p className="bg-customDarkBlue" >
         <Link href="/faq" className=" bg-customDarkBlue text-sm hover:text-teal-400">
            FAQs
          </Link>
         </p>
        </div>

        
        <h1 className="bg-customDarkBlue text-lg font-extralight mb-4 text-customColor ">Follow Us </h1>
        <div className=" bg-customDarkBlue flex gap-6 ">
          
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter" className=" flex items-center gap-2 bg-customDarkBlue hover:text-teal-400">
          < FaXTwitter size={30} className="bg-customDarkBlue" />
            
          </Link>

          <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className=" flex items-center gap-2 bg-customDarkBlue hover:text-teal-400">
           < FaFacebook size={30} className="bg-customDarkBlue" />
            
          </Link>

          <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className=" flex items-center gap-2 bg-customDarkBlue hover:text-teal-400">
             < FaInstagram size={30} className="bg-customDarkBlue"/>
            
          </Link>
         </div>

         <div className="mt-6 mb-4 bg-customDarkBlue ">
        <h1 className="bg-customDarkBlue  text-lg font-extralight mb-4 text-customColor">Address</h1>
        <span className="bg-customDarkBlue  flex items-center">
        <CiLocationOn size={30} className="bg-customDarkBlue" />: Portharcourt, Nigeria.
        </span>
         </div>

        <p className=" bg-customDarkBlue text-sm text-gray-400">© 2024 MyCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
