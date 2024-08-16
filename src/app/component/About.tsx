
"use client"






const About = () => {
  

  return (

    <section
      id="about"
      className=" flex justify-center flex-col items-center mt-16 p-3"
      
    >
      <div className=" items-center justify-around gap-8 w-full flex-wrap">
        <p className="stats-heading max-w-[21.0625rem] text-[2.5rem] font-bold leading-[3rem] text-customDark mb-6">
          One Stop, <br />
          Four <span className="stats-heading-highlight text-customColor">Possibilities</span>.
        </p>

        <div className=" items-baseline  gap-8 max-w-[44.3125rem] w-full flex-wrap mb-8">

          <div className="container flex justify-between">
            <div className=" flex flex-col gap-1 max-w-[8.9375rem]">
              <p className=" text-[2rem] font-semibold leading-[2.5rem] text-customColor">12M</p>
              <p className="stat-text text-[1rem] font-medium leading-[1.5rem] text-customDark">Active Users</p>
            </div>
            <div className="stat-box flex flex-col gap-1 max-w-[8.9375rem]">
              <p className="stat-number text-[2rem] font-semibold leading-[2.5rem] text-customColor">60M</p>
              <p className="stat-text text-[1rem] font-medium leading-[1.5rem] text-customDark">Links & QR codes created</p>
            </div>
          </div>

          <div className=" flex justify-between mt-6">
            <div className=" flex flex-col  max-w-[8.9375rem]">
              <p className="stat-number text-[2rem] font-semibold leading-[2.5rem] text-customColor">1B</p>

              <p className="stat-text text-[1rem] font-medium leading-[1.5rem] text-customDark">
                Clicked & Scanned connections
              </p>
            </div>
            <div className="stat-box flex flex-col gap-1 max-w-[8.9375rem]">
              <p className=" text-[2rem] font-semibold leading-[2.5rem] text-customColor">300K</p>
              <p className="stat-text text-[1rem] font-medium leading-[1.5rem] text-customDark">App Integrations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="items-start flex-wrap justify-around gap-8 w-full">


        <div className="features-container flex  items-center justify-center gap-8 max-w-[44.25rem] flex-[1_1_18.5rem]">
          <div className="features-box-container flex items-start justify-between gap-8 flex-wrap">
            <div className="feature-box flex flex-col items-start justify-center gap-10 max-w-[21.25rem] flex-[1_1_18.5rem]">
              <div className="feature-box-icon w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center justify-center">
                <img src="/media/svg/about-link.svg" alt="link" />
              </div>
              <div className="feature-box-text-container flex flex-col items-start justify-center gap-4 w-full">
                <p className="feature-box-text-header text-[2rem] font-semibold leading-[1.75rem] text-customColor">
                  URL Shortening
                </p>
                <p className="feature-box-text text-[1rem] font-medium leading-[1.5rem] text-customDark">
                  Scissor allows you to shorten URLs of your business, events. Shorten your URL at
                  scale, URL redirects.
                </p>
              </div>
            </div>

            <div className="feature-box flex flex-col items-start justify-center gap-10 max-w-[21.25rem] flex-[1_1_18.5rem]">
              <div className="feature-box-icon w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center justify-center">
                <img src="/media/svg/edit.svg" alt="edit" />
              </div>
              <div className=" flex flex-col items-start justify-center gap-4 w-full">
                <p className=" text-[2rem] font-semibold leading-[1.75rem] text-customColor">
                  Custom URLs
                </p>
                <p className="feature-box-text text-[1rem] font-medium leading-[1.5rem] text-customDark">
                  With Scissor, you can create custom URLs, with the length you want! A solution for
                  socials and businesses.
                </p>
              </div>
            </div>
          </div>

          <div className=" flex items-start justify-between gap-8 flex-wrap">
            <div className="feature-box flex flex-col items-start justify-center gap-10 max-w-[21.25rem] flex-[1_1_18.5rem] ">

              <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center justify-center ">

                <img src="/media/svg/grid.svg" alt="grid" />

              </div>

              <div className=" flex flex-col items-start justify-center gap-4 w-full ">

                <p className="text-[2rem] font-semibold leading-[1.75rem] text-customColor">
                  QR Codes
                </p>
                <p className=" text-[1rem] font-medium leading-[1.5rem] text-customDark">
                  Generate QR codes to your business, events. Bring your audience and customers to
                  your doorstep with this scan and go solution.
                </p>
              </div>
            </div>

            <div className=" flex flex-col items-start justify-center gap-10 max-w-[21.25rem] flex-[1_1_18.5rem]">
              <div className=" w-[3.5rem] h-[3.5rem] rounded-full bg-[#3284ff21] flex items-center justify-center">
                <img src="/media/svg/activity.svg" alt="activity" />
              </div>
              <div className=" flex flex-col items-start justify-center gap-4 w-full">
                <p className="feature-box-text-header text-[2rem] font-semibold leading-[1.75rem] text-customColor">
                  Data Analytics
                </p>
                <p className=" text-[1rem] font-medium leading-[1.5rem] text-customDark">
                  Receive data on the usage of either your shortened URL, custom URLs or generated QR
                  codes. Embedded to monitor progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
