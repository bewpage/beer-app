import { create } from 'zustand';
import { fetchBeers as fetchFromApi } from '../api/punkApi';

// add page configurator settings for app
export const pageSettings: {
  pageSize: number;
} = {
  pageSize: 15,
};

// added types for Beer data
export enum VolumeUnits {
  Liters = 'liters',
  Gallons = 'gallons',
}

export type BeerType = {
  id: number;
  name: string;
  abv: number;
  description: string;
  image_url: string;
  tagline: string;
  first_brewed: string;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  boil_volume: {
    value: number;
    unit: VolumeUnits;
  };
};

type BeerStore = {
  beers: BeerType[];
  page: number;
  skip: number;
  take: number;
  pageSize: number;
  highABVOnly: boolean;
  error: string | null;
  fetchBeers: (page?: number, highABVOnly?: boolean) => Promise<void>;
  toggleABVFilter: () => void;
  updateState: (state: Partial<BeerStore>) => void;
};

export const useBeerStore = create<BeerStore>((set, get) => ({
  beers: [],
  page: 1,
  skip: 0,
  take: pageSettings?.pageSize,
  pageSize: pageSettings?.pageSize,
  highABVOnly: false,
  error: null,
  fetchBeers: async () => {
    /**
     * Instead of using get().page, get().highABVOnly, get().pageSize as default parameters in fetchBeers,
     * use directly destructure them inside the function, for easier to read and understand what defaults are being used.
     *
     * moved error handling to the Zustand store, so that it gets encapsulated within the fetchBeers function itself and
     * it will make component code cleaner.
     */
    try {
      const { page, highABVOnly, pageSize } = get();
      const data = await fetchFromApi(page, highABVOnly, pageSize);
      set({ beers: data });
    } catch (error) {
      set({ error: 'Failed to fetch beers. Please try again.' });
    }
  },
  toggleABVFilter: () => {
    set(state => ({ highABVOnly: !state.highABVOnly }));
  },
  /**
   *
   * Combine Setter Functions
   * into more generic 'updateState' function
   * The updateState function takes an object that partially matches the store's state (Partial<BeerStore>)
   * and merges it with the existing state. Because Zustand's set function accepts partial state updates,
   * it merges the new state with the existing one.
   *
   * @param partialSate
   */
  updateState: (partialSate: Partial<BeerStore>) => set(partialSate),
}));
