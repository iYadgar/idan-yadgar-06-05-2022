import React, {useEffect, useMemo} from 'react';
import SearchBarAutocomplete from '../components/SearchBarAutocomplete';
import {Box, CircularProgress, Container, IconButton, styled, Toolbar, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import WeatherItem from '../components/WeatherItem';
import {Star, StarOutlineOutlined} from '@mui/icons-material';
import {getLocationWeatherDetails, toggleFavoriteLocation} from '../reducer/weatherDataReducer';
import {LOCAL_STORAGE_KEYS} from '../constants';

const HomeContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 2% 5%;
`
const StyledContainer = styled(Container)(({theme}) => ({
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	height: '60%',
	marginTop: '5%',
	backgroundColor: theme.palette.action.hover,
	opacity: 0.8,
	padding: '10px',
	color: theme.palette.text.primary,
	borderRadius: '10px',
	justifyContent: 'space-between'
}))
const ForecastContainer = styled(Container)`
  display: flex;
  height: 70%;
  width: 100%;
  justify-content: space-between;
`
const StyledSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  right: 50%;
`
const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`
const StyledBox = styled(Box)`
  height: 100%;
`

const Home = () => {
	const {
			  selectedLocation,
			  isLoading,
			  error,
			  currentWeather,
			  forecastDetails,
			  favoriteLocations
		  } = useAppSelector(({weatherData}) => weatherData)
	const dispatch = useAppDispatch();
	const isInFavorites = useMemo(() => selectedLocation && favoriteLocations.some((location) => location.Key === selectedLocation.Key), [favoriteLocations.length, selectedLocation]);
	useEffect(() => {
		if (selectedLocation) {
			dispatch(getLocationWeatherDetails(selectedLocation.Key))
		}
	}, [dispatch, selectedLocation]);
	const toggleLocationToFavorites = () => {
		if (selectedLocation) {
			dispatch(toggleFavoriteLocation({location: selectedLocation}))
		}
		localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteLocations))
	}


	const renderWeatherContent = () => forecastDetails && selectedLocation && currentWeather && <>
		<StyledToolbar>
			<Box>
				<Typography variant='h4'>
					{selectedLocation.LocalizedName}, {selectedLocation.Country.LocalizedName}
				</Typography>
				<Typography variant='h6'>
					{currentWeather.WeatherText}, {currentWeather.Temperature.Metric.Value}<span>&#176;</span>
				</Typography>
				<Typography variant='body1'>
					{forecastDetails.Headline.Text}
				</Typography>
			</Box>
			<StyledBox>
				<IconButton
					onClick={toggleLocationToFavorites}
					size="large"
					aria-label="show 4 new mails" color="inherit">
					{isInFavorites ? <Star color='secondary'/> : <StarOutlineOutlined/>}
				</IconButton>

			</StyledBox>
		</StyledToolbar>
		<ForecastContainer>
			{forecastDetails.DailyForecasts.map((forecast) => <WeatherItem key={forecast.Date}
																			   dailyForecast={forecast}/>)}
		</ForecastContainer>
	</>
	return (<HomeContainer>
			<SearchBarAutocomplete/>
			<StyledContainer>
				{isLoading ? <StyledSpinner/> : renderWeatherContent()}
			</StyledContainer>
		</HomeContainer>
	);
}


export default Home;
