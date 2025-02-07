import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';
import CartDrawer from '@/components/shop/CartDrawer';
import { useAuthStore } from '@/store/useAuthStore';

const PublicNavbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Telion Foods
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/shop"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {user ? (
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
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
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </nav>
  );
};