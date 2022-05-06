import {AutocompleteLocation, CurrentWeather} from '../types';

export const AUTOCOMPLETE_MOCKS: AutocompleteLocation[] = [
	{
		"Version": 1,
		"Key": "294021",
		"Type": "City",
		"Rank": 10,
		"LocalizedName": "Moscow",
		"Country": {
			"ID": "RU",
			"LocalizedName": "Russia"
		},
		"AdministrativeArea": {
			"ID": "MOW",
			"LocalizedName": "Moscow"
		}
	},
	{
		"Version": 1,
		"Key": "297120",
		"Type": "City",
		"Rank": 20,
		"LocalizedName": "Mogadishu",
		"Country": {
			"ID": "SO",
			"LocalizedName": "Somalia"
		},
		"AdministrativeArea": {
			"ID": "BN",
			"LocalizedName": "Banaadir"
		}
	},
	{
		"Version": 1,
		"Key": "349269",
		"Type": "City",
		"Rank": 20,
		"LocalizedName": "Montevideo",
		"Country": {
			"ID": "UY",
			"LocalizedName": "Uruguay"
		},
		"AdministrativeArea": {
			"ID": "MO",
			"LocalizedName": "Montevideo"
		}
	},
	{
		"Version": 1,
		"Key": "210666",
		"Type": "City",
		"Rank": 21,
		"LocalizedName": "Mosul",
		"Country": {
			"ID": "IQ",
			"LocalizedName": "Iraq"
		},
		"AdministrativeArea": {
			"ID": "NI",
			"LocalizedName": "Nineveh"
		}
	},
	{
		"Version": 1,
		"Key": "244681",
		"Type": "City",
		"Rank": 21,
		"LocalizedName": "Monterrey",
		"Country": {
			"ID": "MX",
			"LocalizedName": "Mexico"
		},
		"AdministrativeArea": {
			"ID": "NLE",
			"LocalizedName": "Nuevo León"
		}
	},
	{
		"Version": 1,
		"Key": "56186",
		"Type": "City",
		"Rank": 25,
		"LocalizedName": "Montreal",
		"Country": {
			"ID": "CA",
			"LocalizedName": "Canada"
		},
		"AdministrativeArea": {
			"ID": "QC",
			"LocalizedName": "Quebec"
		}
	},
	{
		"Version": 1,
		"Key": "361788",
		"Type": "City",
		"Rank": 30,
		"LocalizedName": "Monrovia",
		"Country": {
			"ID": "LR",
			"LocalizedName": "Liberia"
		},
		"AdministrativeArea": {
			"ID": "MO",
			"LocalizedName": "Montserrado"
		}
	},
	{
		"Version": 1,
		"Key": "29675",
		"Type": "City",
		"Rank": 31,
		"LocalizedName": "Mogilev",
		"Country": {
			"ID": "BY",
			"LocalizedName": "Belarus"
		},
		"AdministrativeArea": {
			"ID": "MA",
			"LocalizedName": "Mogilev"
		}
	},
	{
		"Version": 1,
		"Key": "102145",
		"Type": "City",
		"Rank": 31,
		"LocalizedName": "Monteria",
		"Country": {
			"ID": "CO",
			"LocalizedName": "Colombia"
		},
		"AdministrativeArea": {
			"ID": "COR",
			"LocalizedName": "Córdoba"
		}
	},
	{
		"Version": 1,
		"Key": "223233",
		"Type": "City",
		"Rank": 31,
		"LocalizedName": "Mombasa",
		"Country": {
			"ID": "KE",
			"LocalizedName": "Kenya"
		},
		"AdministrativeArea": {
			"ID": "28",
			"LocalizedName": "Mombasa"
		}
	}
]
export const CURRENT_WEATHER_MOCK: CurrentWeather[] = [
	{
		"LocalObservationDateTime": "2022-05-06T14:48:00+03:00",
		"EpochTime": 1651837680,
		"WeatherText": "Cloudy",
		"WeatherIcon": 7,
		"HasPrecipitation": false,
		"PrecipitationType": null,
		"IsDayTime": true,
		"Temperature": {
			"Metric": {
				"Value": 14.8,
				"Unit": "C",
				"UnitType": 17
			},
			"Imperial": {
				"Value": 59,
				"Unit": "F",
				"UnitType": 18
			}
		},
		"MobileLink": "http://www.accuweather.com/en/ru/moscow/294021/current-weather/294021?lang=en-us",
		"Link": "http://www.accuweather.com/en/ru/moscow/294021/current-weather/294021?lang=en-us"
	}
]
