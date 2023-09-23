import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import store from '../redux/store';

describe('Home component', () => {
  it('renders without errors', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    await waitFor(() => {});

    expect(getByText('Small Intro about stock market, this is just a placeholder')).toBeInTheDocument();
    expect(getByText('Learn More')).toBeInTheDocument();

    const searchInput = getByPlaceholderText('SEARCH COMPANIES...');
    expect(searchInput).toBeInTheDocument();
  });
});
