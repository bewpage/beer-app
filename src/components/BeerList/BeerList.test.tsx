import React from 'react';
import { default as axios } from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BeerList from './BeerList';

// Mocking the API call
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockBeers = [
  { id: 1, name: 'Sample Beer 1', abv: 5.6, tagline: 'Sample Tagline 1' },
  { id: 2, name: 'Sample Beer 2', abv: 8.1, tagline: 'Sample Tagline 2' },
];

// Mock Kendo's ID Generation:
jest.mock('@progress/kendo-react-common', () => {
  const originalModule = jest.requireActual('@progress/kendo-react-common');

  return {
    __esModule: true,
    ...originalModule,
    guid: () => 'kendo-test-guid',
  };
});

describe('BeerList component', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    jest.clearAllMocks();
  });

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

  it('clicking the button toggles the ABV filter', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBeers });
    render(<BeerList />);

    await screen.findByText('Sample Beer 1');

    expect(screen.getByText('Sample Beer 2')).toBeInTheDocument();

    const button = screen.getByText('Show High ABV Beers');
    await userEvent.click(button);

    expect(screen.getByText('Show All Beers')).toBeInTheDocument();
  });
});
