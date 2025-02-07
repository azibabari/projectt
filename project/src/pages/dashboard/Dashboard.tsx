import React from 'react';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { useAuthStore } from '@/store/useAuthStore';

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome back, {user?.full_name}</h1>
      </div>
      <DashboardSummary />
    </div>
  );
};

export default Dashboard;