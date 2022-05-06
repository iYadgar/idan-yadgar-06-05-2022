import {sleep} from '../utils';
import {AUTOCOMPLETE_MOCKS, CURRENT_WEATHER_MOCK, WEEKLY_FORCAST_MOCK} from '../mocks';
import axios, {AxiosRequestConfig} from 'axios';
import {API_ENDPOINTS, API_KEY, BASE_API_URL} from '../constants';
import {AutocompleteLocation, CurrentWeather, WeeklyForcast} from '../types';

interface BaseApiResponse<T> {
	data: T | null;
	error: any;
}

export const baseRequest = async <T>({
	url,
	options = {},
	throwError = false
}: { url: string, options?: AxiosRequestConfig, throwError?: boolean }): Promise<BaseApiResponse<T>> => {
	try {
		if (throwError) {
			throw new Error('Failed')
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
}: { searchTerm: string, useMock?: boolean, throwError?: boolean }): Promise<BaseApiResponse<AutocompleteLocation[]>> => {
	if (useMock) {
		await sleep(1e3)
		return {
			data: AUTOCOMPLETE_MOCKS,
			error: null
		}
	}
	return baseRequest<AutocompleteLocation[]>({
		throwError,
		url: `${BASE_API_URL}/${API_ENDPOINTS.autocomplete}`, options: {
			params: {
				apikey: API_KEY,
				q: searchTerm
			}
		}
	})

}
export const getCurrentWeather = async ({
	locationKey,
	useMock = true,
	throwError = false,
}: { locationKey: string, useMock?: boolean, throwError?: boolean }): Promise<BaseApiResponse<CurrentWeather[]>> => {
	if (useMock) {
		await sleep(1e3)
		return {
			data: CURRENT_WEATHER_MOCK,
			error: null
		}
	}
	const url = `${BASE_API_URL}/${API_ENDPOINTS.currentWeather(locationKey)}`
	return baseRequest<CurrentWeather[]>({url, throwError, options: {params: {apikey: API_KEY}}})

}

export const get5DaysForecast = async ({
	locationKey,
	metric,
	useMock = true,
	throwError = false,
}: { metric: boolean, locationKey: string, useMock?: boolean, throwError?: boolean }): Promise<BaseApiResponse<WeeklyForcast>> => {
	if (useMock) {
		await sleep(1e3)
		return {
			data: WEEKLY_FORCAST_MOCK,
			error: null
		}
	}
	const url = `${BASE_API_URL}/${API_ENDPOINTS.weeklyForecast(locationKey)}`
	return baseRequest<WeeklyForcast>({url, throwError, options: {params: {apikey: API_KEY, metric}}})

}
