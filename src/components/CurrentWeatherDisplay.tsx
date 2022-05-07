import {Typography} from '@mui/material';
import React from 'react';
import {CurrentWeather} from '../types';
import {useAppSelector} from '../app/hooks';

interface Props {
	currentWeather: CurrentWeather
}

const CurrentWeatherDisplay: React.FC<Props> = ({currentWeather}) => {
	const {unitSystem} = useAppSelector(({weatherData}) => weatherData)
	return <Typography variant="body1">
		{currentWeather.WeatherText}, {currentWeather.Temperature[unitSystem === 'metric' ? 'Metric' : 'Imperial'].Value}<span>&#176;</span>
	</Typography>;
};

export default CurrentWeatherDisplay
