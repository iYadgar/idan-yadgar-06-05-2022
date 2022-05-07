import {Typography} from '@mui/material';
import React from 'react';
import {CurrentWeather} from '../types';

interface Props {
	currentWeather: CurrentWeather
}

const CurrentWeatherDisplay: React.FC<Props> = ({currentWeather}) => <Typography variant="body1">
	{currentWeather.WeatherText}, {currentWeather.Temperature.Metric.Value}<span>&#176;</span>
</Typography>;

export default CurrentWeatherDisplay
