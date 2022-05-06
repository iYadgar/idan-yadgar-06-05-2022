export const ROUTES = {
	HOME: '/',
	FAVORITES: 'favorites'
}
export const LOCAL_STORAGE_KEYS = {
	THEME: 'theme'
}
export const BASE_API_URL = 'http://dataservice.accuweather.com'
export const API_ENDPOINTS = {
	autocomplete: 'locations/v1/cities/autocomplete',
	currentWeater(locationKey: string) {
		return `currentconditions/v1/${locationKey}`
	}
}
export const API_KEY = 'bktIx2XdCfgGsfARfOdPJk2ErBzrS65A'
