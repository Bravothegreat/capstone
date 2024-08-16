



 "use client"

import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { GoDash } from "react-icons/go";

interface FAQProps {
  question: string;
  answer: string;
}

const FAQBlock: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`faq-block w-full pb-4 pr-4 cursor-pointer  ${isOpen ? 'bg-gray-100' : ''}`}
      onClick={toggleAnswer}
    >
      <div className="faq-question-container flex items-center justify-between gap-6 w-full border-b border-blue-700 pb-4">
        <p className="faq-question text-blue-700 text-lg font-medium">
          {question}
        </p>
        <div className="icon-container text-blue-700">
          {!isOpen ? (
            <FaPlus size={22} />
          ) : (
            <GoDash size={22} />
          )}
        </div>
      </div>
      <div className={`faq-answer-container ${isOpen ? 'animate-slideInRight' : 'animate-slideOutRight'} mt-4`}>
        {isOpen && (

        <p className="faq-answer text-base font-medium mt-4 text-ustomDark">
          {answer}
        </p>

        )}
      </div>
    </div>
  );
};

export default FAQBlock;

