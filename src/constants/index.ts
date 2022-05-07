import {AccuweatherLocation} from '../types';

export * from './codeToImageMap'
export const ROUTES = {
	HOME: '/',
	FAVORITES: 'favorites'
}
export const LOCAL_STORAGE_KEYS = {
	THEME: 'theme',
	FAVORITES: 'favorites',
	WEATHER_UNIT: 'weatherUnit'
}
export const BASE_API_URL = 'https://dataservice.accuweather.com'
export const API_ENDPOINTS = {
	autocomplete: 'locations/v1/cities/autocomplete',
	locationFromCoordinates: 'locations/v1/cities/geoposition/search',
	currentWeather(locationKey: string) {
		return `currentconditions/v1/${locationKey}`
	},
	weeklyForecast(locationKey: string) {
		return `forecasts/v1/daily/5day/${locationKey}`
	}
}
export const API_KEY = 'bktIx2XdCfgGsfARfOdPJk2ErBzrS65A'
export const DEFAULT_LOCATION: AccuweatherLocation = {
	"Version": 1,
	"Key": "215854",
	"Type": "City",
	"Rank": 31,
	"LocalizedName": "Tel Aviv",
	"Country": {
		"ID": "IL",
		"LocalizedName": "Israel"
	},
	"AdministrativeArea": {
		"ID": "TA",
		"LocalizedName": "Tel Aviv"
	}
}
