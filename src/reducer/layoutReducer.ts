import {createSlice} from '@reduxjs/toolkit';
import {ThemeMode} from '../types';

interface LayoutState {
	themeMode: ThemeMode
}

const initialState: LayoutState = {
	themeMode: 'light'
}

export const layoutSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		setThemeMode(state, action: { payload: { themeMode: ThemeMode } }) {
			const {themeMode} = action.payload;
			state.themeMode = themeMode;
		}
	}
})

export const {setThemeMode} = layoutSlice.actions


export default layoutSlice.reducer
