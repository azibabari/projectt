import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  ShoppingBag,
  Trophy,
  User,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/ricevest', icon: TrendingUp, label: 'RiceVest' },
  { path: '/dashboard/subscriptions', icon: Package, label: 'Subscriptions' },
  { path: '/dashboard/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/dashboard/competitions', icon: Trophy, label: 'Competitions' },
  { path: '/dashboard/profile', icon: User, label: 'Profile' },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;