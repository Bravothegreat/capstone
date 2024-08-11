"use client"
import React, { useState, useRef, useEffect } from 'react';

interface SocialItem {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface DropdownProps {
  label: string;
  socials: SocialItem[];
  icons: any
}

const Dropdown: React.FC<DropdownProps> = ({ icons, label, socials }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = (url: string) => {
    window.open(url, '_blank');
    
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className="bg-soft-orange text-white font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        <span className='flex items-center gap-2'>{icons}<p className='hidden md:block'> {label}</p></span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 py-2 -left-3 bg-white rounded-md shadow-xl">
          {socials.map((item, index) => (
            <li
              key={index}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item.url)}
            >
              <div className="flex items-center">
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;