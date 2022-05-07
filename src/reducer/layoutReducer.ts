import {createSlice} from '@reduxjs/toolkit';
import {ThemeMode} from '../types';
import {LOCAL_STORAGE_KEYS} from '../constants';

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
			localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, themeMode)
		}
	}
})

export const {setThemeMode} = layoutSlice.actions


export default layoutSlice.reducer
