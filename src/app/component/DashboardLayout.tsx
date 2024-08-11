



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
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { onAuthStateChanged } from 'firebase/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render nothing if the authentication state is not determined yet
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full transition-all duration-300 ${
          isSidebarOpen ? 'w-40 md:w-32 sm:w-20' : 'w-16 md:w-12 sm:w-8'
        } bg-[rgba(50,132,255,0.13)] text-black p-4 border-r border-gray-400`}>


       <nav>
          <ul className="space-y-6 mt-10">
            <li>
              <Link href="/dashboard" className="flex items-center space-x-2 hover:text-gray-300">
                <RxDashboard size={40} />
                {isSidebarOpen && <span>Dashboard</span>}
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link href="/dashboard/settings" className="flex items-center space-x-2 hover:text-gray-300">
                    <IoSettingsOutline size={20} />
                    {isSidebarOpen && <span>Settings</span>}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/analytics" className="flex items-center space-x-2 hover:text-gray-300">
                    <IoAnalyticsSharp size={20} />
                    {isSidebarOpen && <span>Analytics</span>}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/profile" className="flex items-center space-x-2 hover:text-gray-300">
                    <ImProfile size={20} />
                    {isSidebarOpen && <span>Profile</span>}
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-gray-300 focus:outline-none mt-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-4V9a2 2 0 114 0v1" />
                </svg>
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>


         
          {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute bottom-4 left-4 text-white focus:outline-none"
        >
          {isSidebarOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>

      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-40 md:ml-32 sm:ml-20' : 'ml-16 md:ml-12 sm:ml-8'
        } flex-1`}
      >
        {/* Header */}
        <header
          className={` bg-[rgba(50,132,255,0.13)] bg-opacity-30 p-5 fixed top-0 left-0 right-0 transition-all duration-300 ${
            isSidebarOpen ? 'ml-40 md:ml-32 sm:ml-20' : 'ml-16 md:ml-12 sm:ml-8'
          }`}
        >
          <h1 className="text-2xl font-semibold">Dashboard</h1>
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

