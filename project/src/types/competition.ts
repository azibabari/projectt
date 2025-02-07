export interface Competition {
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
  rules?: string[];
  judgingCriteria?: {
    category: string;
    weight: number;
  }[];
}

export interface CompetitionEntry {
  id: string;
  competitionId: string;
  userId: string;
  registrationDate: string;
  status: 'registered' | 'submitted' | 'judged';
  score?: number;
  rank?: number;
  submission?: {
    recipeName: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    photos: string[];
  };
}