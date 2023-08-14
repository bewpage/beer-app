// punkApi.ts
import axios from 'axios';

const BASE_URL = 'https://api.punkapi.com/v2/beers';

export const fetchBeers = async (page: number) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page: page,
        per_page: 10, // or any other number you want
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
