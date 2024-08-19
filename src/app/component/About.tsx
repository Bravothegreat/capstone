"use client";

const About = () => {
  return ( 
   
    <section id="about" className="  mt-16 p-3">

   <div className= "flex gap-10 flex-col lg:flex-row md:flex-row">

      

        <div className="overflow-hidden">
        <span className=" max-w-[21.0625rem] text-[2.5rem] font-bold leading-[3rem] text-customDark mb-6 animate-slideInFromTop ">
        One Stop, <br />
        Four <span className=" text-customColor">Possibilities</span>.
        </span>
        </div>


        <div className="flex gap-10 sm: gap-40 animate-slideInFromLeft">

          <div className="flex flex-col animate-shakee">
          <span className=" text-[2rem] font-semibold  text-customColor">
          12M
          </span>
          <span className=" text-xl font-semibold  text-customDark">
          Active Users
          </span>
          </div>

         <div className="flex flex-col">
         <span className="text-[2rem] font-semibold text-customColor  ">
          60M
          </span>
          <span className=" text-xl font-semibold  text-customDark">
          Links & QR codes created
          </span>
         </div>
         </div>

         <div className="flex animate-slideInFromBottom ">

          <div className="flex flex-col animate-shaky " >
          <span className=" text-[2rem] font-semibold text-customColor">
            1B
            </span>
            <span className=" text-xl font-semibold text-customDark">
            Clicked & Scanned connections
            </span>
          </div>

          <div className="flex flex-col animate-shaky ">
             <span className=" text-[2rem] font-semibold  text-customColor">
            300K
            </span>
            <span className=" text-xl font-semibold text-customDark">
            App Integrations
            </span>
          </div>
         </div>

      </div>




      
      <div className=" mt-20 ">

        <div className=" gap-10  ">

          <div className="flex flex-col items-center" >
            <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center  justify-center mb-5">
              {" "}
              <img src="/media/svg/about-link.svg" alt="link" />{" "}
            </div>

            <p className="feature-box-text-header text-[2rem] font-semibold leading-[1.75rem] text-customColor mb-5 ">
              URL Shortening
            </p>
            <p className=" text-lg font-medium text-customDark">
              Scissor allows you to shorten URLs of your business, events.
              Shorten your URL at scale, URL redirects.
            </p>
          </div>

          <div className="flex flex-col items-center" >
            <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center justify-center mb-5 mt-10">
              <img src="/media/svg/grid.svg" alt="grid" />
            </div>
            <p className="text-[2rem] font-semibold leading-[1.75rem] text-customColor mb-5">
              QR Codes
            </p>
            <p className=" text-lg font-medium text-customDark">
              Generate QR codes to your business, events. Bring your audience
              and customers to your doorstep with this scan and go solution.
            </p>
          </div>

        </div>


        <div className=" gap-10 mb-10 ">


           <div className="flex flex-col items-center ">
            <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center mt-10 justify-center ">
            <img src="/media/svg/edit.svg" alt="edit" />
            </div>
            <p className=" text-[2rem] font-semibold leading-[1.75rem] text-customColor mt-5">
              Custom URLs
            </p>
            <p className="text-lg font-medium text-customDark mt-5">
              With Scissor, you can create custom URLs, with the length you want! A solution for
              socials and businesses.
            </p>
            </div>


            <div className="flex flex-col items-center ">

            <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center mb-5 mt-10 justify-center">
              <img src="/media/svg/activity.svg" alt="activity" />
            </div>
            <p className=" text-[2rem] font-semibold leading-[1.75rem] text-customColor mb-5">
              Data Analytics
            </p>
            <p className=" text-lg font-medium text-customDark">
              Receive data on the usage of either your shortened URL, custom URLs or generated QR
              codes. Embedded to monitor progress.
            </p>
            </div>


           </div>


      </div>
    </section>
  );
};

export default About;



