import axios from 'axios';
import { pageSettings } from '../components/BeerList/BeerList';

const BASE_URL = 'https://api.punkapi.com/v2/beers';
export const fetchBeers = async (
  page: number = 1,
  highABVOnly: boolean = false,
  perPage: number = pageSettings.pageSize
) => {
  const params: { [key: string]: any } = {
    page: page,
    per_page: perPage,
  };
  if (highABVOnly) {
    params['abv_gt'] = 8;
  }
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
