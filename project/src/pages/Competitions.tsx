import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import AuthModal from '@/components/auth/AuthModal';
import { formatPrice } from '@/lib/utils';

interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'active' | 'completed';
  entryFee: number;
}

const SAMPLE_COMPETITIONS: Competition[] = [
  {
    id: '1',
    title: 'Master Chef Rice Challenge',
    description: 'Create the most innovative rice dish using Azfa Eats premium rice varieties.',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    prizePool: 500000,
    maxParticipants: 100,
    currentParticipants: 45,
    status: 'upcoming',
    entryFee: 5000,
  },
  {
    id: '2',
    title: 'Traditional Rice Recipes Showdown',
    description: 'Showcase your best traditional rice recipes and compete for amazing prizes.',
    startDate: '2024-03-20',
    endDate: '2024-04-05',
    prizePool: 750000,
    maxParticipants: 150,
    currentParticipants: 0,
    status: 'upcoming',
    entryFee: 7500,
  },
];

const Competitions = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuthStore();
  const [competitions] = useState<Competition[]>(SAMPLE_COMPETITIONS);

  const handleRegister = (competitionId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    // Handle competition registration
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cooking Competitions
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Showcase your culinary skills, compete with fellow food enthusiasts, and win amazing prizes!
        </p>
      </div>

      {/* Featured Competition */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue to-primary opacity-90" />
        <div className="relative z-10 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Master Chef Rice Challenge</h2>
          <p className="text-lg mb-6">
            Join our flagship cooking competition and showcase your culinary expertise
            with Azfa Eats premium rice varieties.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-75">Prize Pool</p>
                <p className="font-semibold">{formatPrice(500000)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-75">Date</p>
                <p className="font-semibold">Mar 1 - Mar 15</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-75">Participants</p>
                <p className="font-semibold">45/100</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="h-6 w-6 mr-2" />
              <div>
                <p className="text-sm opacity-75">Entry Fee</p>
                <p className="font-semibold">{formatPrice(5000)}</p>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleRegister('1')}
          >
            Register Now
          </Button>
        </div>
      </div>

      {/* Competition List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{competition.title}</h3>
              <p className="text-gray-600 mb-4">{competition.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Prize Pool</p>
                  <p className="font-semibold">{formatPrice(competition.prizePool)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Entry Fee</p>
                  <p className="font-semibold">{formatPrice(competition.entryFee)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-semibold">
                    {new Date(competition.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-semibold">
                    {competition.currentParticipants}/{competition.maxParticipants}
                  </p>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => handleRegister(competition.id)}
              >
                Register for Competition
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Rules Section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Competition Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Eligibility</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Must be 18 years or older</li>
              <li>Open to both amateur and professional chefs</li>
              <li>Must use Azfa Eats rice products</li>
              <li>Valid ID required for registration</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Judging Criteria</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Taste and Flavor (40%)</li>
              <li>Presentation (25%)</li>
              <li>Creativity (20%)</li>
              <li>Technique (15%)</li>
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

export default Competitions;