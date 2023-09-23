import React from 'react';
import { render } from '@testing-library/react';
import NavBar from '../components/Navbar';

test('renders STOCK PULSE page name', () => {
  const { getByText } = render(<NavBar />);
  const pageNameElement = getByText(/STOCK PULSE/i);
  expect(pageNameElement).toBeInTheDocument();
});

test('renders cog and microphone icons', () => {
  const { getByTestId } = render(<NavBar />);
  const cogIcon = getByTestId('navcons-cog');
  const microphoneIcon = getByTestId('navcons-microphone');

  expect(cogIcon).toBeInTheDocument();
  expect(microphoneIcon).toBeInTheDocument();
});

test('matches snapshot', () => {
  const { asFragment } = render(<NavBar />);
  expect(asFragment()).toMatchSnapshot();
});
