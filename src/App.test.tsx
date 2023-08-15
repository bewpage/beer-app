import React from 'react';
import { default as axios } from 'axios';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Kendo's ID Generation:
jest.mock('@progress/kendo-react-common', () => {
  const originalModule = jest.requireActual('@progress/kendo-react-common');

  return {
    __esModule: true,
    ...originalModule,
    guid: () => 'kendo-test-guid',
  };
});

// Mock out all top level functions in axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
// create a mocked data from api
const mockedData = [
  {
    id: 1,
    name: 'Punk IPA 2007 - 2010',
    tagline: 'Post Modern Classic. Spiky. Tropical. Hoppy.',
    abv: 1,
  },
  {
    id: 2,
    name: 'Punk IPA 2007 - 2010',
    tagline: 'Post Modern Classic. Spiky. Tropical. Hoppy.',
    abv: 10,
  },
];
describe('App component', () => {
  beforeEach(() => {
    // clear all mocks before each test
    mockedAxios.get.mockClear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockedAxios.get.mockClear();
  });

  it('renders beers data correctly', async () => {
    // mock get function
    mockedAxios.get.mockResolvedValueOnce({ data: mockedData });
    const { container } = render(<App />);

    // wait for data to load
    await screen.findAllByText(/Punk IPA 2007 - 2010/i);

    expect(screen.getByText('Show Billing Info')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('handles axios call failure gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Call Failed'));
    render(<App />);

    await screen.findByText(/Beer List/i);

    // Check for an error message, a retry button, or whatever your error handling mechanism is
    expect(
      screen.getByText(/Failed to fetch beers. Please try again./i)
    ).toBeInTheDocument();
  });

  it('renders default message on empty data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<App />);

    await screen.findByText('Beer List');

    expect(screen.getByText('No records available')).toBeInTheDocument();
  });
});
