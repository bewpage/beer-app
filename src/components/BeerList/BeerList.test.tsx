import React from 'react';
import { default as axios } from 'axios';
import { render, screen } from '@testing-library/react';
import BeerList from './BeerList';

// Mocking the API call
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBeers = [
  { id: 1, name: 'Sample Beer 1', abv: 5.6, tagline: 'Sample Tagline 1' },
  { id: 2, name: 'Sample Beer 2', abv: 8.1, tagline: 'Sample Tagline 2' },
];

describe('BeerList component', () => {
  it('fetches and displays beers on mount', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBeers });
    const { container } = render(<BeerList />);

    await screen.findByText('Sample Beer 1');

    expect(container).toMatchSnapshot();
  });

  it('displays a message when no beers are found', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<BeerList />);
    await screen.findByText('No records available');
  });

  it('displays a message when an error occurs', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Error'));
    render(<BeerList />);
    await screen.findByText('An error occurred while fetching beers');
  });
});
