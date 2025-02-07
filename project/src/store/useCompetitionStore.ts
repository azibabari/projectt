import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Competition, CompetitionEntry } from '@/types/competition';

interface CompetitionStore {
  competitions: Competition[];
  userEntries: CompetitionEntry[];
  loading: boolean;
  loadCompetitions: () => Promise<void>;
  loadUserEntries: () => Promise<void>;
  registerForCompetition: (competitionId: string) => Promise<void>;
  submitEntry: (entryId: string, submission: CompetitionEntry['submission']) => Promise<void>;
}

export const useCompetitionStore = create<CompetitionStore>((set, get) => ({
  competitions: [],
  userEntries: [],
  loading: false,

  loadCompetitions: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('competitions')
      .select('*')
      .order('startDate', { ascending: true });

    if (error) throw error;
    set({ competitions: data || [], loading: false });
  },

  loadUserEntries: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('competition_entries')
      .select(`
        *,
        competition:competitions(*)
      `)
      .order('registrationDate', { ascending: false });

    if (error) throw error;
    set({ userEntries: data || [], loading: false });
  },

  registerForCompetition: async (competitionId: string) => {
    const { error } = await supabase
      .from('competition_entries')
      .insert({
        competitionId,
        registrationDate: new Date().toISOString(),
        status: 'registered',
      });

    if (error) throw error;
    await get().loadUserEntries();
  },

  submitEntry: async (entryId: string, submission) => {
    const { error } = await supabase
      .from('competition_entries')
      .update({
        submission,
        status: 'submitted',
      })
      .eq('id', entryId);

    if (error) throw error;
    await get().loadUserEntries();
  },
}));