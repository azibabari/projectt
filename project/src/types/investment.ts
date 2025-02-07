export interface InvestmentPackage {
  id: string;
  name: string;
  description: string;
  rice_type: string;
  weight_kg: number;
  investment_amount: number;
  duration_months: number;
  roi_percentage: number;
  available_units: number;
  created_at: string;
  active: boolean;
}

export interface Investment {
  id: string;
  user_id: string;
  package_id: string;
  amount_invested: number;
  units: number;
  start_date: string;
  maturity_date: string;
  status: 'active' | 'matured' | 'cancelled';
  created_at: string;
  package?: InvestmentPackage;
}

export interface InvestmentStats {
  totalInvested: number;
  activeInvestments: number;
  expectedReturns: number;
  nextMaturity: string | null;
}