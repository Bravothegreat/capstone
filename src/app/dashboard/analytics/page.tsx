

// pages/dashboard/index.tsx
import React from 'react';
import DashboardLayout from '../../component/DashboardLayout';

const DashboardAnalytic: React.FC = () => {
  return (
    <DashboardLayout>
      <div className=''>
      <h2>Welcome to the Dashboard</h2>
      <p>This is the analytics dashboard page.</p>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAnalytic;
