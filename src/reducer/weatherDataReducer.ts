import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AccuweatherLocation, CurrentWeather, WeeklyForcast} from '../types';
import * as api from '../api'
import {LOCAL_STORAGE_KEYS} from '../constants';

interface HomeState {
	selectedLocation: AccuweatherLocation | null
	currentWeather: CurrentWeather | null
	forecastDetails: WeeklyForcast | null
	error: any
	isLoading: boolean
	favoriteLocations: AccuweatherLocation[];

}

const initialState: HomeState = {
	selectedLocation: null,
	currentWeather: null,
	forecastDetails: null,
	error: null,
	isLoading: false,
	favoriteLocations: []

}
export const getLocationWeatherDetails = createAsyncThunk('home/getCurrentWeather', async (locationKey: string) => {
	const [currentWeatherDetails, forecastDetails] = await Promise.all([api.getCurrentWeather({
		locationKey,
		throwError: false,
		useMock: true
	}), api.get5DaysForecast({locationKey, metric: true, throwError: false, useMock: true})])
	return {
		data: {currentWeather: currentWeatherDetails.data, forecastDetails: forecastDetails.data},
		error: currentWeatherDetails.error || forecastDetails.error
	}

})

export const weatherDataSlice = createSlice({
	name: 'weatherData',
	initialState,
	reducers: {
		setSelectedLocation(state, action: { payload: { location: AccuweatherLocation } }) {
			const {location} = action.payload;
			state.selectedLocation = location;
		},
		toggleFavoriteLocation(state, action: { payload: { location: AccuweatherLocation } }) {
			const {location} = action.payload;
			const isLocationExists = state.favoriteLocations.some((loc) => location.Key === loc.Key)
			if (isLocationExists) {
				state.favoriteLocations = state.favoriteLocations.filter((loc) => loc.Key !== location.Key)
			} else {
				state.favoriteLocations.push(location)
			}
			localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(state.favoriteLocations))
		}, setFavoriteLocations(state, action: { payload: { locations: AccuweatherLocation[] } }) {
			const {locations} = action.payload;
			state.favoriteLocations = locations
			localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(state.favoriteLocations))
		}


	},
	extraReducers(builder) {
		builder.addCase(getLocationWeatherDetails.pending, (state) => {
			state.isLoading = true
		}).addCase(getLocationWeatherDetails.fulfilled, (state, action) => {
			const {data, error} = action.payload || {}
			state.isLoading = false
			if (data.currentWeather && data.forecastDetails && !error) {
				state.currentWeather = data.currentWeather[0]
				state.forecastDetails = data.forecastDetails
			}
			state.error = error
		})
	}
})

export const {setSelectedLocation, toggleFavoriteLocation, setFavoriteLocations} = weatherDataSlice.actions


export default weatherDataSlice.reducer
