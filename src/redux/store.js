import { configureStore } from '@reduxjs/toolkit';
import companySlice from './companySlice';

const store = configureStore({
  reducer: {
    companies: companySlice,
  },
});

export default store;
