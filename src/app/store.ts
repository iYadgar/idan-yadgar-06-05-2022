import {configureStore} from '@reduxjs/toolkit';
import layoutReducer from '../reducer/layoutReducer';
import weatherDataReducer from '../reducer/weatherDataReducer';

export const store = configureStore({
	reducer: {
		weatherData: weatherDataReducer,
		layout: layoutReducer
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
