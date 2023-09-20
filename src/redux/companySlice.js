import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
  filterCompanies: [],
  isTyping: false,
  companyDetails: {},
  loading: false,
  error: '',
};

const API_KEY = 'cc124a5c542dc1173ec8a3b6367aebe4';

export const getCompanies = createAsyncThunk('companies/getCompanies', async () => {
  try {
    const company = await fetch(`https://financialmodelingprep.com/api/v3/stock_market/actives?apikey=${API_KEY}`);
    if (!company.ok) {
      throw new Error(`Error fetching companies: ${company.statusText}`);
    }
    const data = await company.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching companies: ${error.message}`);
  }
});

export const singleCompanyData = createAsyncThunk('companies/singleCompanyData', async (symbol) => {
  try {
    const company = await fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`);
    if (!company.ok) {
      throw new Error(`Error fetching company data: ${company.statusText}`);
    }
    const data = await company.json();
    return data[0];
  } catch (error) {
    throw new Error(`Error fetching company data: ${error.message}`);
  }
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    filter: (state, action) => {
      state.filterCompanies = state.companies
        .filter((company) => company.name.toLowerCase().includes(action.payload.toLowerCase()));
    },
    checkTyping: (state, action) => {
      state.isTyping = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(singleCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(singleCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.companyDetails = action.payload;
      })
      .addCase(singleCompanyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { filter, checkTyping } = companiesSlice.actions;
export default companiesSlice.reducer;
