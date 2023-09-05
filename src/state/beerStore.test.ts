import { BeerType, useBeerStore, VolumeUnits } from './beerStore';
import { default as axios } from 'axios';

const MOCK_BEERS_DATA: BeerType = {
  id: 1,
  name: 'beer1',
  abv: 5,
  description: 'beer1 description',
  image_url: 'beer1 image url',
  tagline: 'beer1 tagline',
  first_brewed: 'beer1 first brewed',
  food_pairing: ['beer1 food pairing 1', 'beer1 food pairing 2'],
  brewers_tips: 'beer1 brewers tips',
  contributed_by: 'beer1 contributed by',
  boil_volume: {
    value: 1,
    unit: VolumeUnits.Liters,
  },
};

// Mocking the API call
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBeers = [MOCK_BEERS_DATA];

describe('beerStore', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    jest.clearAllMocks();
  });

  it('should initialize store with default parameters', async () => {
    const initialState = useBeerStore.getState();

    expect(initialState.highABVOnly).toBe(false);
    expect(initialState.error).toBe(null);
    expect(initialState.page).toBe(1);
    expect(initialState.beers).toEqual([]);
  });

  it('should toggle ABV filter', async () => {
    const initialState = useBeerStore.getState();

    expect(initialState.highABVOnly).toBe(false);

    useBeerStore.getState().toggleABVFilter();

    const stateAfterToggle = useBeerStore.getState();
    expect(stateAfterToggle.highABVOnly).toBe(true);
  });

  it('should fetch beers data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBeers });
    const initialState = useBeerStore.getState();

    expect(initialState.beers).toEqual([]);

    await useBeerStore.getState().fetchBeers();

    const stateAfterFetch = useBeerStore.getState();
    expect(stateAfterFetch.beers).toEqual(mockBeers);
    expect(stateAfterFetch.beers.length).toBe(1);
    expect(stateAfterFetch.beers[0].id).toBe(1);
    expect(stateAfterFetch.beers[0].name).toBe('beer1');
  });

  it('should set error when fetch beers data fails', async () => {
    const errorMessage = 'Failed to fetch beers. Please try again.';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    const initialState = useBeerStore.getState();

    expect(initialState.error).toBe(null);

    await useBeerStore.getState().fetchBeers();

    const stateAfterFetch = useBeerStore.getState();
    expect(stateAfterFetch.error).toBe(errorMessage);
  });
});
