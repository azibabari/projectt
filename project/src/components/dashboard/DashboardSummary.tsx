import React from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, Award, Bell } from 'lucide-react';
import { useInvestmentStore } from '@/store/useInvestmentStore';
import { formatPrice } from '@/lib/utils';

const DashboardSummary = () => {
  const { stats, investments } = useInvestmentStore();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Investments</p>
              <p className="text-2xl font-bold">{stats.activeInvestments}</p>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invested</p>
              <p className="text-2xl font-bold">{formatPrice(stats.totalInvested)}</p>
            </div>
            <div className="p-3 bg-secondary bg-opacity-10 rounded-full">
              <Package className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expected Returns</p>
              <p className="text-2xl font-bold">{formatPrice(stats.expectedReturns)}</p>
            </div>
            <div className="p-3 bg-accent bg-opacity-10 rounded-full">
              <Award className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {investments.slice(0, 3).map((investment) => (
              <div
                key={investment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">{investment.package?.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(investment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">{formatPrice(investment.amount_invested)}</p>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard/investments"
            className="block text-center text-primary hover:text-primary-dark mt-4"
          >
            View All Activities
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;