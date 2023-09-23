// import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
import companiesReducer, {
  filter, checkTyping, getCompanies, singleCompanyData,
} from '../redux/companySlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mocking fetch to simulate API calls
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockStore),
  ok: true,
}));

describe('companiesSlice', () => {
  beforeEach(() => {
    configureStore({
      reducer: {
        companies: companiesReducer,
      },
    });
  });

  test('filter action updates filterCompanies correctly', () => {
    const initialState = {
      companies: [
        { name: 'Company A' },
        { name: 'Company B' },
        { name: 'Company C' },
      ],
      filterCompanies: [],
      isTyping: false,
      companyDetails: {},
      loading: false,
      error: '',
    };

    const action = filter('A');
    const state = companiesReducer(initialState, action);

    expect(state.filterCompanies).toEqual([
      { name: 'Company A' },
      { name: 'Company B' },
      { name: 'Company C' },
    ]);
  });

  test('checkTyping action sets isTyping correctly', () => {
    const initialState = {
      companies: [],
      filterCompanies: [],
      isTyping: false,
      companyDetails: {},
      loading: false,
      error: '',
    };

    const action = checkTyping(true);
    const state = companiesReducer(initialState, action);

    expect(state.isTyping).toBe(true);
  });
});

describe('getCompanies thunk', () => {
  beforeEach(() => {
    mockStore({}); // Initialized mock store
  });

  test('getCompanies successfully fetches data', async () => {
    const mockResponse = [
      {
        symbol: 'EBET',
        name: 'EBET, Inc.',
        change: 0.0101,
        price: 0.0761,
        changesPercentage: 15.303,
      },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => mockResponse,
    });

    const store = mockStore({});

    await store.dispatch(getCompanies());

    // Check if the store was updated correctly
    const actions = store.getActions();
    expect(actions[0].type).toBe('companies/getCompanies/pending');
  });
});

describe('singleCompanyData thunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('singleCompanyData successfully fetches data', async () => {
    const mockResponse = [
      {
        symbol: 'EBET',
        price: 0.0761,
        beta: 1.142167,
        volAvg: 92810715,
        mktCap: 40939063,
        lastDiv: 0,
        range: '0.027-2.66',
        changes: 0.0101,
        companyName: 'EBET, Inc.',
        currency: 'USD',
        cik: '0001829966',
        isin: 'US29667L1061',
        cusip: '29667L106',
        exchange: 'NASDAQ Capital Market',
        exchangeShortName: 'NASDAQ',
        industry: 'Gambling',
        website: 'https://ebet.gg',
        description: 'EBET, Inc. developsslot machines',
        ceo: 'Mr. Aaron  Speach',
        sector: 'Consumer Cyclical',
        country: 'US',
        fullTimeEmployees: '37',
        phone: '888 411 2726',
        address: '197 East California Avenue',
        city: 'Las Vegas',
        state: 'NV',
        zip: '89104',
        dcfDiff: null,
        dcf: 0,
        image: 'https://financialmodelingprep.com/image-stock/EBET.png',
        ipoDate: '2021-04-15',
        defaultImage: false,
        isEtf: false,
        isActivelyTrading: true,
        isAdr: false,
        isFund: false,
      },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => mockResponse,
    });

    const symbol = 'EBET';

    await store.dispatch(singleCompanyData(symbol));

    const actions = store.getActions();
    expect(actions[0].type).toBe('companies/singleCompanyData/pending');
  });
});
