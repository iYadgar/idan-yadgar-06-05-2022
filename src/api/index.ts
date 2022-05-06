import {sleep} from '../utils';
import {AUTOCOMPLETE_MOCKS} from '../mocks';
import axios from 'axios';
import {API_ENDPOINTS, API_KEY, BASE_API_URL} from '../constants';
import {AutocompleteLocation} from '../types';

interface BaseApiResponse<T> {
	data: T | null;
	error: any;
}

export const getAutocompleteLocations = async ({
	searchTerm,
	useMock = true,
	throwError = false,
}: { searchTerm: string, useMock?: boolean, throwError?: boolean }): Promise<BaseApiResponse<AutocompleteLocation[]>> => {
	try {
		if (throwError) {
			throw new Error('Failed')
		}
		if (useMock) {
			await sleep(1e3)
			return {
				data: AUTOCOMPLETE_MOCKS,
				error: null
			}
		}
		const {data} = await axios.get(`${BASE_API_URL}/${API_ENDPOINTS.autocomplete}`, {
			params: {
				apikey: API_KEY,
				q: searchTerm
			}
		})
		return {data, error: null}
	} catch (e) {
		return {data: null, error: e}
	}
}
