import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  TrendingUp,
  Calendar,
  Package,
  DollarSign,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInvestmentStore } from '@/store/useInvestmentStore';
import { useAuthStore } from '@/store/useAuthStore';
import { formatPrice } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';

const RiceVest = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [units, setUnits] = useState(1);
  
  const { user } = useAuthStore();
  const {
    packages,
    investments,
    stats,
    loading,
    loadPackages,
    loadInvestments,
    invest,
  } = useInvestmentStore();

  useEffect(() => {
    loadPackages();
    if (user) {
      loadInvestments();
    }
  }, [user]);

  const handleInvest = async (packageId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      await invest(packageId, units);
      setSelectedPackage(null);
      setUnits(1);
    } catch (error) {
      console.error('Investment error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RiceVest - Invest in Rice, Harvest Returns
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Secure your future rice supply while earning competitive returns. 
          Invest today in our carefully curated rice investment packages.
        </p>
      </div>

      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary bg-opacity-10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Total Invested</h3>
            </div>
            <p className="text-2xl font-bold">{formatPrice(stats.totalInvested)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-secondary bg-opacity-10 rounded-full">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Expected Returns</h3>
            </div>
            <p className="text-2xl font-bold">{formatPrice(stats.expectedReturns)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-accent bg-opacity-10 rounded-full">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Active Investments</h3>
            </div>
            <p className="text-2xl font-bold">{stats.activeInvestments}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue bg-opacity-10 rounded-full">
                <Calendar className="h-6 w-6 text-blue" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Next Maturity</h3>
            </div>
            <p className="text-2xl font-bold">
              {stats.nextMaturity 
                ? format(new Date(stats.nextMaturity), 'MMM d, yyyy')
                : 'No active investments'}
            </p>
          </div>
        </div>
      )}

      {/* Investment Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-gray-600 mb-4">{pkg.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Amount:</span>
                  <span className="font-semibold">{formatPrice(pkg.investment_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{pkg.duration_months} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI:</span>
                  <span className="font-semibold text-primary">{pkg.roi_percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rice Type:</span>
                  <span className="font-semibold">{pkg.rice_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight per Unit:</span>
                  <span className="font-semibold">{pkg.weight_kg}kg</span>
                </div>
              </div>
              {selectedPackage === pkg.id ? (
                <div className="mt-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUnits(Math.max(1, units - 1))}
                    >
                      -
                    </Button>
                    <span className="font-semibold">{units} unit(s)</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUnits(Math.min(pkg.available_units, units + 1))}
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleInvest(pkg.id)}
                    >
                      Invest {formatPrice(pkg.investment_amount * units)}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedPackage(null);
                        setUnits(1);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full mt-4"
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  Invest Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Active Investments */}
      {user && investments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Your Investments</h2>
            <div className="space-y-4">
              {investments.map((investment) => (
                <div
                  key={investment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{investment.package?.name}</h3>
                      <p className="text-sm text-gray-600">
                        {investment.units} unit(s) • {investment.package?.weight_kg * investment.units}kg total
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(investment.amount_invested)}</p>
                      <p className="text-sm text-gray-600">
                        Matures {format(new Date(investment.maturity_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 bg-blue bg-opacity-5 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="h-6 w-6 text-blue flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">How RiceVest Works</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Choose an investment package that suits your budget and goals</li>
              <li>Invest in multiple units to increase your returns</li>
              <li>Receive your rice allocation plus ROI at maturity</li>
              <li>Reinvest or collect your returns in rice or cash</li>
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
}

export default RiceVest;