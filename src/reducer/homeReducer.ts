import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AutocompleteLocation, CurrentWeather} from '../types';
import * as api from '../api'

interface HomeState {
	selectedLocation: AutocompleteLocation | null
	error: any
	currentWeather: CurrentWeather | null
	isLoading: boolean
}

const initialState: HomeState = {
	selectedLocation: null,
	error: null,
	currentWeather: null,
	isLoading: false
}
export const getCurrentWeather = createAsyncThunk('home/getCurrentWeather', async (locationKey: string) => {
	const {data, error} = await api.getCurrentWeather({locationKey, throwError: false, useMock: false})
	if (data) {
		return {data, error}
	}

})
export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		setSelectedLocation(state, action: { payload: { location: AutocompleteLocation } }) {
			const {location} = action.payload;
			state.selectedLocation = location;
		}
	},
	extraReducers(builder) {
		builder.addCase(getCurrentWeather.pending, (state) => {
			state.isLoading = true
		}).addCase(getCurrentWeather.fulfilled, (state, action) => {
			const {data, error} = action.payload || {}
			state.isLoading = false
			if (data && !error) {
				state.currentWeather = data[0]
			}
			state.error = error
		})
	}
})

export const {setSelectedLocation} = homeSlice.actions


export default homeSlice.reducer
