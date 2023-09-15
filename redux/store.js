import { configureStore } from '@reduxjs/toolkit';
import startupNameGeneratorReducer from './features/startupNameGeneratorSlice';

export const store = configureStore({
	reducer: {
		startupNameGenerator: startupNameGeneratorReducer,
	},
});
