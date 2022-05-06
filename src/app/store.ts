import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import homeReducer from '../reducer/homeReducer';
import layoutReducer from '../reducer/layoutReducer';

export const store = configureStore({
	reducer: {
		home: homeReducer,
		layout: layoutReducer
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	RootState,
	unknown,
	Action<string>>;
