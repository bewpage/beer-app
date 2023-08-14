import React from 'react';
import { default as axios } from 'axios';
import { render, screen } from '@testing-library/react';
import App from './App';

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

test('renders learn react link', async () => {
  // mock get function
  mockedAxios.get.mockResolvedValueOnce({ data: mockedData });
  const { container } = render(<App />);

  // wait for data to load
  await screen.findAllByText(/Punk IPA 2007 - 2010/i);

  expect(screen.getByText('Show Billing Info')).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
