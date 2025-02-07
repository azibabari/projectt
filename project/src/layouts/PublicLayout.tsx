import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '@/components/navigation/PublicNavbar';
import Footer from '@/components/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;