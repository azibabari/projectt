import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '@/components/navigation/DashboardNavbar';
import DashboardSidebar from '@/components/navigation/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;