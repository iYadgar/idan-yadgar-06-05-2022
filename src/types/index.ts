export interface AutocompleteLocation {
	Version: number,
	Key: string,
	Type: string,
	Rank: number,
	LocalizedName: string,
	Country: {
		ID: string,
		LocalizedName: string
	},
	AdministrativeArea: {
		ID: string,
		LocalizedName: string
	}
}

export type ThemeMode = 'dark' | 'light';

export interface CurrentWeather {
	LocalObservationDateTime: string,
	EpochTime: number,
	WeatherText: string,
	WeatherIcon: number,
	HasPrecipitation: boolean,
	PrecipitationType: null,
	IsDayTime: boolean,
	Temperature: {
		Metric: {
			Value: number,
			Unit: "C",
			UnitType: number
		},
		Imperial: {
			Value: number,
			Unit: "F",
			UnitType: number
		}
	},
	MobileLink: string,
	Link: string
}
