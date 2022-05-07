import {sleep} from '../utils';
import {AUTOCOMPLETE_MOCKS, CURRENT_WEATHER_MOCK, GEO_LOCATION_RES_MOCK, WEEKLY_FORCAST_MOCK} from '../mocks';
import axios, {AxiosRequestConfig} from 'axios';
import {API_ENDPOINTS, API_KEY, BASE_API_URL} from '../constants';
import {AccuweatherLocation, CurrentWeather, WeeklyForcast} from '../types';
import {USE_MOCK} from '../config';

interface BaseApiResponse<T> {
	data: T | null;
	error: any;
}

export const baseRequest = async <T>({
	url,
	mockData,
	options = {},
	throwError = false
}: { url: string, mockData?: T, options?: AxiosRequestConfig, throwError?: boolean }): Promise<BaseApiResponse<T>> => {
	try {
		if (throwError) {
			throw new Error('Failed')
		}
		if (USE_MOCK && mockData) {
			await sleep(1e3)
			return {
				data: mockData,
				error: null
			}
		}

		const {data} = await axios.get(url, options)
		return {data, error: null}
	} catch (e) {
		return {data: null, error: e}
	}
}

export const getAutocompleteLocations = async ({
	searchTerm,
	useMock = true,
	throwError = false,
}: { searchTerm: string, useMock?: boolean, throwError?: boolean }): Promise<BaseApiResponse<AccuweatherLocation[]>> => {
	return baseRequest<AccuweatherLocation[]>({
		throwError,
		mockData: AUTOCOMPLETE_MOCKS,
		url: `${BASE_API_URL}/${API_ENDPOINTS.autocomplete}`, options: {
			params: {
				apikey: API_KEY,
				q: searchTerm
			}
		}
	})

}
export const getLocationFromCoordinates = async ({
	coordinates,
	throwError = false,
}: { coordinates: string, throwError?: boolean }): Promise<BaseApiResponse<AccuweatherLocation>> => {
	return baseRequest<AccuweatherLocation>({
		throwError,
		mockData: GEO_LOCATION_RES_MOCK,
		url: `${BASE_API_URL}/${API_ENDPOINTS.locationFromCoordinates}`, options: {
			params: {
				apikey: API_KEY,
				q: coordinates
			}
		}
	})

}

export const getCurrentWeather = async ({
	locationKey,
	throwError = false,
}: { locationKey: string, throwError?: boolean }): Promise<BaseApiResponse<CurrentWeather[]>> => {
	const url = `${BASE_API_URL}/${API_ENDPOINTS.currentWeather(locationKey)}`
	return baseRequest<CurrentWeather[]>({
		url, throwError,
		mockData: CURRENT_WEATHER_MOCK, options: {params: {apikey: API_KEY}}
	})

}

export const get5DaysForecast = async ({
	locationKey,
	metric,
	throwError = false,
}: { metric: boolean, locationKey: string, throwError?: boolean }): Promise<BaseApiResponse<WeeklyForcast>> => {
	const url = `${BASE_API_URL}/${API_ENDPOINTS.weeklyForecast(locationKey)}`
	return baseRequest<WeeklyForcast>({
		url,
		mockData: WEEKLY_FORCAST_MOCK, throwError, options: {params: {apikey: API_KEY, metric}}
	})

}
