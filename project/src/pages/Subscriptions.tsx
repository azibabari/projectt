import React, { useState } from 'react';
import { Calendar, Package, Truck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import AuthModal from '@/components/auth/AuthModal';
import { formatPrice } from '@/lib/utils';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryFrequency: string;
  riceQuantity: number;
  features: string[];
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Perfect for small households',
    price: 15000,
    deliveryFrequency: 'Monthly',
    riceQuantity: 10,
    features: [
      '10kg premium rice monthly',
      'Free delivery',
      'Flexible payment options',
      'Cancel anytime',
    ],
  },
  {
    id: 'family',
    name: 'Family Plan',
    description: 'Ideal for families',
    price: 25000,
    deliveryFrequency: 'Monthly',
    riceQuantity: 25,
    features: [
      '25kg premium rice monthly',
      'Priority delivery',
      'Recipe suggestions',
      'Flexible payment options',
      'Cancel anytime',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'Best value for bulk users',
    price: 45000,
    deliveryFrequency: 'Monthly',
    riceQuantity: 50,
    features: [
      '50kg premium rice monthly',
      'VIP delivery service',
      'Custom rice blend options',
      'Recipe consultation',
      'Priority customer support',
      'Cancel anytime',
    ],
  },
];

const Subscriptions = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuthStore();

  const handleSubscribe = (planId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    // Handle subscription logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rice Subscription Plans
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Never run out of premium rice. Subscribe to our flexible delivery plans
          and enjoy consistent quality at your doorstep.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary">
                  {formatPrice(plan.price)}
                  <span className="text-base font-normal text-gray-600">
                    /month
                  </span>
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-primary mr-2" />
                  <span>{plan.riceQuantity}kg premium rice</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <span>{plan.deliveryFrequency} delivery</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-primary mr-2" />
                  <span>Free delivery</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan.id)}
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-blue bg-opacity-5 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="h-6 w-6 text-blue flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Why Choose Our Subscription?
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>Guaranteed monthly supply</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>Premium quality rice</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>Flexible delivery schedules</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>No long-term commitment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Subscriptions;