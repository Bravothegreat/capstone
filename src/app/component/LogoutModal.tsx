
"use client"

import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center top-0 left-0 fixed z-1000 w-full h-full bg-black bg-opacity-50" onClick={onCancel}>
      <div className="bg-white border border-gray-600 p-5 w-[300px] text-center " onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to log out?</p>
       <div className='flex justify-center gap-5'>
       <button onClick={onConfirm} className='bg-blue-500 rounded-lg border-2 w-24 p-1.5'>OK</button>
       <button onClick={onCancel} className='bg-blue-500 rounded-lg border-2 w-24 p-1.5'>Cancel</button>
       </div>
      </div>
    </div>
  );
};

export default LogoutModal;

