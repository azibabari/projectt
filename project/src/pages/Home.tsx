import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import AuthModal from '@/components/auth/AuthModal';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    navigate(path);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Rice for Every Table
            </h1>
            <p className="text-xl text-white mb-8">
              Experience the finest quality rice with our innovative platform combining e-commerce, investment, and community engagement.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" onClick={() => handleNavigation('/shop')}>
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => handleNavigation('/ricevest')}>
                Learn About RiceVest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Azfa Eats?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully selected rice varieties meeting the highest quality standards.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-white mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Investment</h3>
              <p className="text-gray-600">Invest in rice futures with our innovative RiceVest platform.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Reliable nationwide delivery right to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Premium Rice?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers and start your journey with Azfa Eats today.
          </p>
          <Button variant="secondary" size="lg" onClick={() => setIsAuthModalOpen(true)}>
            Get Started Now
          </Button>
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Home;