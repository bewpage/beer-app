import { create } from 'zustand';
import { fetchBeers as fetchFromApi } from '../api/punkApi'; // Renamed for clarity

interface BeerStore {
  beers: any[];
  page: number;
  highABVOnly: boolean;
  error: string | null;
  fetchBeers: (page?: number, highABVOnly?: boolean) => Promise<void>;
  toggleABVFilter: () => void;
  setPage: (page: number) => void;
  setError: (error: string | null) => void;
}

export const useBeerStore = create<BeerStore>((set, get) => ({
  beers: [],
  page: 1,
  highABVOnly: false,
  error: null,
  fetchBeers: async (page = get().page, highABVOnly = get().highABVOnly) => {
    const data = await fetchFromApi(page, highABVOnly);
    set({ beers: data });
  },
  toggleABVFilter: () => {
    set(state => ({ highABVOnly: !state.highABVOnly }));
  },
  setPage: (page: number) => {
    set({ page });
  },
  setError: (error: string | null) => set({ error }),
}));
