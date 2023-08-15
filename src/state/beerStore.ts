import { create } from 'zustand';
import { fetchBeers as fetchFromApi } from '../api/punkApi';
import { pageSettings } from '../App';

interface BeerStore {
  beers: any[];
  page: number;
  skip: number;
  take: number;
  pageSize: number;
  highABVOnly: boolean;
  error: string | null;
  fetchBeers: (page?: number, highABVOnly?: boolean) => Promise<void>;
  toggleABVFilter: () => void;
  setPage: (page: number) => void;
  setError: (error: string | null) => void;
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useBeerStore = create<BeerStore>((set, get) => ({
  beers: [],
  page: 1,
  skip: 0,
  take: pageSettings?.pageSize,
  pageSize: pageSettings?.pageSize,
  highABVOnly: false,
  error: null,
  fetchBeers: async (
    page = get().page,
    highABVOnly = get().highABVOnly,
    pageSize = get().pageSize
  ) => {
    const data = await fetchFromApi(page, highABVOnly, pageSize);
    set({ beers: data });
  },
  toggleABVFilter: () => {
    set(state => ({ highABVOnly: !state.highABVOnly }));
  },
  setPage: (page: number) => {
    set({ page });
  },
  setError: (error: string | null) => set({ error }),
  setSkip: (skip: number) => set({ skip }),
  setTake: (take: number) => set({ take }),
  setPageSize: (pageSize: number) => set({ pageSize }),
}));
