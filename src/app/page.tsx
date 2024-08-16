"use client";

import Navbar from "./component/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLink2 } from "react-icons/fi";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import FAQSection from "./component/Faqs"
import AnalyticsLand from "./component/Analyticsland";
import About from "./component/About";
import Footer from "./component/Footer";
// import LoadingSpinner from "./component/LoadingSpiner";

export default function Home() {
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className=" flex justify-center items-center h-[90vh] "><span className="text-5xl font-extrabold text-customColor animate-slideIn animate-shake ">
      Slash It
      </span>
      </div>;
  }

  return (
    <>
      <Navbar />

      <div className=" mt-36 ml-4  md:ml-20 lg:ml-40 ">
        <p className="mt-10 text-2xl font-semibold sm:mt-20 sm:text-4xl  sm:font-bold">
          Strengthen your digital connections.
        </p>

        <p className="mt-2 text-xl font-semibold md:mt-4 md:text-3xl md:font-medium">
          Enhance your online experience with our advanced{" "}
          <span className="text-customColor">URL shortening</span> solution
        </p>

        <p className="mt-4 text-base font-light pr-2  sm:px-6">
          Monitor and manage your shortened URLs, customize them to reflect your
          brand identity, and use personalized slugs, branded links, and domain
          customization features to strengthen your brand presence and boost
          user interaction.
        </p>

        

        <div className="  mt-8 ">
          <Link
            href="/signup"
            className="bg-blue-500 text-lg 
            text-blue-500 
            border-2 w-80 flex items-center gap-4 px-4 py-2 rounded-lg  bg-customColor text-white">
            Get started for free
            <IoArrowForwardOutline size={40} className=" bg-customColor " />
          </Link>
        </div>
 
            <section className="mt-12 border-2 p-12 bg-customDarkBlue text-white rounded-xl mr-4 flex justify-center items-center flex-col text-center animate-slideIn ">
                  <p className="mb-8 bg-customDarkBlue ">

           <span
            className="bg-customDarkBlue text-base font-bold sm:text-2xl sm:font-extrabold md:text-2xl lg:text-4xl lg:font-extrabold block mb-4 text-button whitespace-nowrap">
            Strong Connections Begin with a Click.
          </span>


              <span className="bg-customDarkBlue  sm:font-extralight text-base md:font-extralight text-base ">Sign up for a free account and start making use of Slash it.</span>
            </p>

            <div className="flex justify-center items-center flex-col w-full bg-customDarkBlue">

            

              
            <span className="flex justify-center items-center mb-4">
              <FiLink2 className="bg-customDarkBlue" size={45} style={{ fontSize: '40px' }} />
              <FiLink2 className="bg-customDarkBlue" size={45} style={{ fontSize: '40px' }} />
              <IoArrowForwardOutline className="bg-customDarkBlue text-customColor w-48" size={45} style={{ fontSize: '40px' }} />
              <FiLink2 className="bg-customDarkBlue" size={45} style={{ fontSize: '80px' }} />
            </span>


          <p className="bg-customDarkBlue ">
               Seamlessly transform your long URLs into concise and shareable links with just a few clicks.
              </p>
            </div>
          </section> 

         
        
          
          
         
          
          <AnalyticsLand />
          
            < About />
            <FAQSection />
            <Footer />
      </div>
      
    </>
  );
}
