
"use client"

import FAQBlock from './FaqBlock'; 

interface FAQProps {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const isAuthenticationPopupOpen = false; 

  return (
    <section
      id="faqs"
      aria-haspopup={isAuthenticationPopupOpen}
      className={`w-full flex items-center justify-center  mb-10  ${
        isAuthenticationPopupOpen ? 'blur-sm pointer-events-none' : ''
      }`}
    >
      <div className="faqs-container max-w-3xl w-full flex flex-col items-center justify-center ">

        <div className="faq-header-container flex items-center justify-center mt-16 mb-12 gap-2">

        <div className="faq-header-line w-2 h-8 bg-gradient-to-b from-customColor via-customColor/10 to-transparent"></div>



          <p className="faq-header text-blue-700 text-4xl font-bold">
            FAQs
          </p>
        </div>
       
        <div className="faq-blocks flex flex-col items-center justify-center gap-8 w-full">
          <FAQBlock
            question="How does URL shortening work?"
            answer="URL shortening works by taking a long URL and creating a shorter, condensed version that redirects to the original URL. When a user clicks on the shortened link, they are redirected to the intended destination."
          />
     
          <FAQBlock
            question="Is it necessary to create an account to use the URL shortening service?"
            answer="Yes! As creating one unlocks a treasure trove of link-wrangling superpowers like crafting custom links, performance tracking of your links, and more."
          />
         
          <FAQBlock
            question="What is a QR Code?"
            answer="Quick response or QR, is a type of barcode that can store a multitude of information. The obvious difference between a QR Code and Barcode is its appearance. A QR Code is usually in the shape of a square and contains smaller, even blocks similar to Tetris. A Barcode, on the other hand, has vertical bars in different thicknesses and is often accompanied by a serial number."
          />
          
          <FAQBlock
            question="What can a QR Code do?"
            answer="Because of its versatility, a QR Code can be programmed to do a multitude of things. It can be split into two formats: Dynamic and Static. A Dynamic QR Code is useful for businesses or nonprofits in their marketing strategy because of its advantages. Though it needs a subscription to work, it is a small price to pay compared to the benefits it offers. Dynamic QR Code solutions are editable, which means if you made a mistake and only noticed it after the QR Codes are printed, you can easily log in to the dashboard and fix them without changing the appearance of the already printed Codes."
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;



