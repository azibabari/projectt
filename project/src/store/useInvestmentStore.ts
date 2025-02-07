import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { InvestmentPackage, Investment, InvestmentStats } from '@/types/investment';

interface InvestmentStore {
  packages: InvestmentPackage[];
  investments: Investment[];
  stats: InvestmentStats;
  loading: boolean;
  loadPackages: () => Promise<void>;
  loadInvestments: () => Promise<void>;
  invest: (packageId: string, units: number) => Promise<void>;
  calculateStats: () => void;
}

export const useInvestmentStore = create<InvestmentStore>((set, get) => ({
  packages: [],
  investments: [],
  stats: {
    totalInvested: 0,
    activeInvestments: 0,
    expectedReturns: 0,
    nextMaturity: null,
  },
  loading: false,

  loadPackages: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('investment_packages')
        .select('*')
        .order('investment_amount', { ascending: true });

      if (error) throw error;
      set({ packages: data || [] });
    } catch (error) {
      console.error('Error loading packages:', error);
      set({ packages: [] });
    } finally {
      set({ loading: false });
    }
  },

  loadInvestments: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('investments')
        .select(`
          *,
          package:investment_packages(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ investments: data || [] });
      get().calculateStats();
    } catch (error) {
      console.error('Error loading investments:', error);
      set({ investments: [] });
    } finally {
      set({ loading: false });
    }
  },

  invest: async (packageId: string, units: number) => {
    const pkg = get().packages.find(p => p.id === packageId);
    if (!pkg) throw new Error('Investment package not found');

    const amount = pkg.investment_amount * units;
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + pkg.duration_months);

    try {
      const { error } = await supabase
        .from('investments')
        .insert({
          package_id: packageId,
          units,
          amount_invested: amount,
          maturity_date: maturityDate.toISOString(),
        });

      if (error) throw error;
      await get().loadInvestments();
    } catch (error) {
      console.error('Error making investment:', error);
      throw error;
    }
  },

  calculateStats: () => {
    const investments = get().investments;
    const activeInvestments = investments.filter(inv => inv.status === 'active');
    
    const stats: InvestmentStats = {
      totalInvested: activeInvestments.reduce((sum, inv) => sum + inv.amount_invested, 0),
      activeInvestments: activeInvestments.length,
      expectedReturns: activeInvestments.reduce((sum, inv) => {
        const roi = (inv.package?.roi_percentage || 0) / 100;
        return sum + (inv.amount_invested * (1 + roi));
      }, 0),
      nextMaturity: activeInvestments.length > 0 
        ? new Date(Math.min(...activeInvestments.map(inv => new Date(inv.maturity_date).getTime()))).toISOString()
        : null,
    };

    set({ stats });
  },
}));