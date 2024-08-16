"use client"
import Link from "next/link";

export default function AnalyticsLand() {

  return (
    <section
    
    id="analytics"
      className="mt-8 p-4  rounded-lg bg-white flex flex-col justify-center mr-2.5"
     
  >
    <div className="text-center mb-6 bg-white">
      
    <span className="text-customColor flex justify-center bg-white text-lg font-extrabold">
        Slash It Analytics
      </span>

    </div>

    <span className="text-button text-center flex mb-6 font-extrabold justify-center font-extrabold text-lg sm:text-2xl font-extrabold md:text-2xl font-extrabold  lg:text-3xl whitespace-normal sm:whitespace-nowrap bg-white font-extrabold">
  Tap into click and scan data with Slash It Analytics
</span>

    
   
    <p className="text-gray-600 text-base bg-white mb-6 text-center flex justify-center text-base font-medium ">
      Knowing how your short links and QR Codes are performing should be as easy as making them. Track, analyze, and optimize all your connections in one place.
    </p>
    <div className="flex justify-center bg-white">
      <button className=" text-white bg-customDarkBlue font-semibold py-2 px-4 rounded hover:bg-customColor transition-colors">
      <Link href="/signup" className="bg-customDarkBlue hover:bg-customColor">  Get Started for Free</Link>
      </button>
    </div>
  </section>
  )
}

