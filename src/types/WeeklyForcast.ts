export interface Headline {
	EffectiveDate: string;
	EffectiveEpochDate: number;
	Severity: number;
	Text: string;
	Category: string;
	EndDate: string;
	EndEpochDate: number;
	MobileLink: string;
	Link: string;
}

export interface Minimum {
	Value: number;
	Unit: string;
	UnitType: number;
}

export interface Maximum {
	Value: number;
	Unit: string;
	UnitType: number;
}

export interface Temperature {
	Minimum: Minimum;
	Maximum: Maximum;
}

export interface DayOrNight {
	Icon: number;
	IconPhrase: string;
	HasPrecipitation: boolean;
	PrecipitationType?: string;
	PrecipitationIntensity?: string;
}

export interface DailyForecast {
	Date: string;
	EpochDate: number;
	Temperature: Temperature;
	Day: DayOrNight;
	Night: DayOrNight;
	Sources: string[];
	MobileLink: string;
	Link: string;
}

export interface WeeklyForcast {
	Headline: Headline;
	DailyForecasts: DailyForecast[];
}


