export * from './codeToImageMap'
export const ROUTES = {
	HOME: '/',
	FAVORITES: 'favorites'
}
export const LOCAL_STORAGE_KEYS = {
	THEME: 'theme',
	FAVORITES: 'favorites'
}
export const BASE_API_URL = 'http://dataservice.accuweather.com'
export const API_ENDPOINTS = {
	autocomplete: 'locations/v1/cities/autocomplete',
	currentWeather(locationKey: string) {
		return `currentconditions/v1/${locationKey}`
	},
	weeklyForecast(locationKey: string) {
		return `forecasts/v1/daily/5day/${locationKey}`
	}
}
export const API_KEY = 'bktIx2XdCfgGsfARfOdPJk2ErBzrS65A'
