




"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io"; 
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ImLink } from "react-icons/im";


type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
}

const navItems: NavItem[] = [
  {
    label: 'Platform',
    link: "#",
    children: [
      {
        label: 'URLShortener',
        link: '/#url-shortener',
      },
      {
        label: 'Analytics',
        link: '/#analytics',
      },
    ],
  },

  {
    label: 'Pricing',
    link: "#",
    children: [
      {
        label: 'List',
        link: '/#pricelist',
      },
    ],
  },
  {
    label: "About",
    link: "/#about"
  },
  {
    label: "FAQS",
    link: "/#faqs"
  }
];

export default function Navbar() {
  const [animationParenth] = useAutoAnimate()
  const [isSideMenuOpen, setSideMenue] = useState(false);

  function openSideMenu() {
    setSideMenue(true);
  }

 function closeSideMenu() {
  setSideMenue(false);
 }

  return (
    // <div className='  flex w-full max-w-7xl justify-between px-4 text-sm mt-2 fixed top-0 left-0  shadow-md z-50  '>

    <div className="fixed top-0 left-0 w-full max-w-7xl mx-auto px-4 text-sm mt- mb-4 sm:mb-20 md:mb-20 shadow-md z-50 flex justify-between mt-0 p-5 ">
      {/* left side */}
      <section ref={animationParenth} className='flex items-center gap-10'>

        {/* logo */}

        <div className='h-fit rounded-xl  border-neutral-400 px-4 py-2 text-neutral-400 transition-all  flex item-center justify-content gap-2'>
        <ImLink size={34} color="#0b59de" className=''/>
        <h1 className='text-align:center mt-1 text-2xl font-black  text-customColor'>SLASH IT</h1>
        </div>

        { isSideMenuOpen &&   <MobileNav closeSideMenu={closeSideMenu}/> }

        {/* nav links */}
        <div className='hidden md:flex items-center gap-4 transition-all'>
          {navItems.map((d, i) => (
            <div key={i} className='relative group px-2 py-3 transition-all'>
              <p className='flex cursor-pointer items-center gap-2 text-black-400 group-hover:text-neutral font-bold'>
                <span>{d.label}</span>
                {d.children && (
                  <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0' />
                )}
              </p>

              {d.children && (
                <div className='absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg  py-3 shadow-md transition-all group-hover:flex'>
                  {d.children.map((ch, j) => (
                    <Link key={j} href={ch.link ?? "#"} className='flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black'>
                      <span className='whitespace-nowrap pl-3'>{ch.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* right side */}
      <section className='hidden md:flex items-center gap-8'>
        <Link href="/signin">
          <button className='h-fit text-button  transition-all hover:text-gray-400 font-black text-base'>
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className='h-fit rounded-xl border-2 border-button px-4 py-2 text-button  transition-all hover:border-gray-400
          hover:text-gray-400 whitespace-nowrap font-extrabold text-base'>
            Sign Up
          </button>
        </Link>
      </section>

      <FiMenu 
       onClick={openSideMenu}
      className='cursor-pointer text-4xl md:hidden'
       size={40}
      />
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  return (
    <div className='fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden'>
     
      <div className='h-full w-[65%]  px-4 py-4 '>
        <section className='flex justify-end'>
          <IoMdClose 
          onClick={closeSideMenu}
          className="cursor-pointer text-4xl" 
          size={40}
          />
        </section>

        <div className='flex flex-col text-base gap-2 transition-all font-bold'>
          {navItems.map((d, i) => (
           <SingleNavItem 
           key={i}
           label={d.label}
            link={d.link} >

              {d.children}
              </ SingleNavItem>
          ))}
        </div>

        <section className='flex-col mt-4 flex items-center gap-8'>
        <Link href="/signin">
          <button className='h-fit text-button transition-all hover:text-gray-400  text-base font-black'>
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className='w-full max-w-[200px] rounded-xl border-2 border-button px-4 py-2 text-button transition-all hover:border-gray-400 hover:text-gray-400 whitespace-nowrap text-base font-black'>
            Sign Up
          </button>
        </Link>
      </section>

      </div>
    </div>
  );
}

function SingleNavItem(d: NavItem) {
   const [animationParenth] = useAutoAnimate()
  const [isItemOpen, setItem] = useState(false);

  function toggleItem() {
    setItem(!isItemOpen);
  }

  return (
   
    <Link href={d.link ?? "#"}
    ref={animationParenth}
      onClick={toggleItem}
     className='relative  px-2 py-3 transition-all'>
      <p className='flex cursor-pointer items-center gap-2 text-black-400 group-hover:text-black text-sm'>
        <span>{d.label}</span>
        {d.children && (
          <IoIosArrowDown className={`text-xs transition-all ${isItemOpen && "rotate-180"}`} />
        )}
      </p>

      { isItemOpen && d.children && (
       // bg-white
        <div className='  w-auto flex-col gap-1 rounded-lg  py-3  transition-all flex'>
          {d.children.map((ch, j) => (
            <Link key={j} href={ch.link ?? "#"} className='flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black'>
              <span className='whitespace-nowrap pl-3'>{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}

  