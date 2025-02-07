import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LineChart } from 'lucide-react';
import { Button } from './ui/button';
import AuthModal from './auth/AuthModal';
import { useAuthStore } from '@/store/useAuthStore';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Azfa Eats</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/shop"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Shop
              </Link>
              <Link
                to="/ricevest"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                RiceVest
              </Link>
              <Link
                to="/competitions"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Competitions
              </Link>
              <Link
                to="/subscriptions"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Subscriptions
              </Link>
              {user && (
                <Link
                  to="/supply-optimization"
                  className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium flex items-center"
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  Supply AI
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {user ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut()}
              >
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAuthModalOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;