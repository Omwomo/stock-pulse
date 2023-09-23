import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '../../setupTests';
import store from '../redux/store';
import '@testing-library/jest-dom';
import Details from '../components/Details';

describe('Details Component', () => {
  test('renders loading message when companyDetails is not available', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          {' '}
          <Details />
        </BrowserRouter>
      </Provider>,
    );
  });

  test('renders company details when companyDetails is available', () => {
    const mockCompanyDetails = {
      companyName: 'Example Company',
      description: 'Example Description',
      industry: 'Example Industry',
      website: 'www.example.com',
      price: 100,
      mktCap: 'Example Market Cap',
      changes: 'Example Changes',
      ceo: 'Example CEO',
      exchange: 'Example Exchange',
    };

    render(
      <BrowserRouter>
        {' '}
        <Details companyDetails={mockCompanyDetails} />
      </BrowserRouter>,
    );
  });

  test('handles back button click', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <BrowserRouter>
        <Details companyDetails={{}} />
      </BrowserRouter>,
    );
  });
});
