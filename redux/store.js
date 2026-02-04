import { configureStore } from '@reduxjs/toolkit';
import startupNameGeneratorReducer from './features/startupNameGeneratorSlice';
import domainReducer from './features/domainSlice';

export const store = configureStore({
  reducer: {
    startupNameGenerator: startupNameGeneratorReducer,
    domain: domainReducer
  },
});
