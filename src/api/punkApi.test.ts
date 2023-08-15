import axios from 'axios';
import { fetchBeers } from './punkApi';
import { pageSettings } from '../App';

// Mock the axios module
jest.mock('axios');

describe('fetchBeers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should fetch beers with default parameters', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: ['beer1', 'beer2'] });

    const result = await fetchBeers();
    expect(result).toEqual(['beer1', 'beer2']);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.punkapi.com/v2/beers',
      {
        params: {
          page: 1,
          per_page: pageSettings.pageSize,
        },
      }
    );
  });

  it('should fetch beers with high ABV when highABVOnly is true', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: ['strongBeer1', 'strongBeer2'],
    });

    const result = await fetchBeers(1, true);
    expect(result).toEqual(['strongBeer1', 'strongBeer2']);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://api.punkapi.com/v2/beers',
      {
        params: {
          page: 1,
          per_page: pageSettings.pageSize,
          abv_gt: 8,
        },
      }
    );
  });

  it('should throw an error when the axios call fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(fetchBeers()).rejects.toThrow('API Error');
  });
});
