

// "use client";
// // components/DashboardLayout.tsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/firebase';
// import { useRouter } from 'next/navigation';
// import LogoutModal from './LogoutModal';
// import { RxDashboard } from 'react-icons/rx';
// import { ImProfile } from 'react-icons/im';
// import { IoSettingsOutline, IoAnalyticsSharp } from 'react-icons/io5';
// import { onAuthStateChanged } from 'firebase/auth';
// import { FiLogOut } from 'react-icons/fi';


// import type { User } from "firebase/auth";
// import {  firestore } from "../firebase/firebase"
// import { doc, getDoc, updateDoc } from "firebase/firestore";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
//   const router = useRouter();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

   
//   const [user, setUser] = useState<User | null>(null);
//   const [userName, setUserName] = useState<string | null>(null);





//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         const userDoc = await getDoc(doc(firestore, "users", user.uid));
//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setUserName(userData?.profileName || "");
           
//         }
//       } else {
//         router.push("/signin");
//       }
     
//     });
//     return () => unsubscribe();
//   }, [router]);



//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//         router.push('/signin'); // Redirect to sign-in if not authenticated
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const handleLogout = () => {
//     setIsModalOpen(true);
//   };

//   const confirmLogout = async () => {
//     try {
//       await signOut(auth);
//       router.push('/signin');
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setIsModalOpen(false);
//     }
//   };

//   const cancelLogout = () => {
//     setIsModalOpen(false);
//     console.log('Logout canceled');
//   };

//   // Render nothing if the authentication state is not determined yet
//   if (isAuthenticated === null) {
//     return null;
//   }

//   return (
//     <div className="flex">
       
//       {/* Sidebar */}
//       <aside className="fixed left-0 top-0 h-full w-12 md:w-28 sm:w-[5px]  text-black-500 md:p-4 sm:p-1 border-r border-gray-400 flex flex-col justify-between font-bold bg-white shadow-lg ">

//         <nav className='mt-12 bg-white'>
//           <ul className="space-y-6 mt-10 bg-white mt-24">
//             {/* <p>slash</p> */}
//             <li className='bg-white'>
//               <Link href="/dashboard" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
//                 <RxDashboard size={20} />
//                 <span className="hidden md:inline">Dashboard</span>
//               </Link>
//             </li>
//             {isAuthenticated && (
//               <>
//                 <li>
//                   <Link href="/dashboard/settings" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
//                     <IoSettingsOutline size={20} />
//                     <span className="hidden md:inline">Settings</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/dashboard/analytics" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
//                     <IoAnalyticsSharp size={20} className='bg-white'/>
//                     <span className="  hidden md:inline ">Analytics</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/dashboard/profile" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
//                     <ImProfile size={20} />
//                     <span className="hidden md:inline">Profile</span>
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>

//         {/* Logout Button */}
//         <div className="flex flex-col justify-end p-4 bg-white">
//           <button
//             onClick={handleLogout}
//             className="flex items-center justify-center space-x-2 hover:text-gray-300 focus:outline-none font-bold bg-white"
//           >
//             <FiLogOut size={30} className='bg-white' />
//             <span className="hidden md:inline">Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="ml-12 md:ml-28 flex-1 transition-all duration-300">
//         {/* Header */}
//         <header className=" bg-opacity-30 p-5 fixed top-0 left-0 right-0 transition-all duration-300  border-b border-gray-500 border-solid z-100 ">
//            {/* <h1 className=''>slashit</h1> */}
//           <h1 className="text-2xl font-extrabold  text-black ">Dashboard</h1>

//           <h1 className="font-bold text-base mb-4">Welcome, {userName}</h1>
          
       
//       </header>

//         {/* Main Section */}
//         <main className="mt-20 p-5">{children}</main>
//       </div>

//       {/* Logout Modal */}
//       <LogoutModal isOpen={isModalOpen} onConfirm={confirmLogout} onCancel={cancelLogout} />
//     </div>
//   );
// };

// export default DashboardLayout;






 "use client";
// components/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/navigation';
import LogoutModal from './LogoutModal';
import { RxDashboard } from 'react-icons/rx';
import { ImProfile } from 'react-icons/im';
import { IoSettingsOutline, IoAnalyticsSharp } from 'react-icons/io5';
import { onAuthStateChanged } from 'firebase/auth';
import { FiLogOut } from 'react-icons/fi';

import type { User } from "firebase/auth";
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData?.profileName || "");

          // Set the current date and time
          const now = new Date();
          const formattedDateTime = now.toLocaleString();
          setCurrentDateTime(formattedDateTime);
        }
      } else {
        router.push("/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/signin'); // Redirect to sign-in if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
    console.log('Logout canceled');
  };

  // Render nothing if the authentication state is not determined yet
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-12 md:w-28 sm:w-[5px] text-black-500 md:p-4 sm:p-1 border-r border-gray-400 flex flex-col justify-between font-bold bg-white shadow-lg">
        <nav className='mt-12 bg-white'>
          <ul className="space-y-6 mt-10 bg-white mt-24">
            <li className='bg-white'>
              <Link href="/dashboard" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
                <RxDashboard size={20} />
                <span className="hidden md:inline">Dashboard</span>
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link href="/dashboard/settings" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
                    <IoSettingsOutline size={20} />
                    <span className="hidden md:inline">Settings</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/analytics" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
                    <IoAnalyticsSharp size={20} className='bg-white' />
                    <span className="hidden md:inline">Analytics</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/profile" className="flex items-center justify-center md:justify-start space-x-2 hover:text-gray-300 bg-white">
                    <ImProfile size={20} />
                    <span className="hidden md:inline">Profile</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="flex flex-col justify-end p-4 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 hover:text-gray-300 focus:outline-none font-bold bg-white"
          >
            <FiLogOut size={30} className='bg-white' />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-12 md:ml-28 flex-1 transition-all duration-300">
        {/* Header */}
        <header className="bg-opacity-30 p-5 fixed top-0 left-0 right-0 transition-all duration-300 border-b border-gray-500 border-solid z-100">
          <h1 className="text-2xl font-extrabold text-black">Dashboard</h1>
          <h1 className="font-bold text-base mb-4">Welcome, {userName}</h1>
          <p className="text-sm text-gray-600">{currentDateTime}</p> 
        </header>

        {/* Main Section */}
        <main className="mt-20 p-5">{children}</main>
      </div>

      {/* Logout Modal */}
      <LogoutModal isOpen={isModalOpen} onConfirm={confirmLogout} onCancel={cancelLogout} />
    </div>
  );
};

export default DashboardLayout;

