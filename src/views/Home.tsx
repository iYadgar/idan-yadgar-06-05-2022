import React, {useEffect} from 'react';
import SearchBarAutocomplete from '../components/SearchBarAutocomplete';
import {Box, CircularProgress, Container, styled, Toolbar, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector, useFavoritesIndicator} from '../app/hooks';
import {getLocationWeatherDetails} from '../reducer/weatherDataReducer';
import ForecastItem from '../components/ForecastItem';
import CurrentWeatherDisplay from '../components/CurrentWeatherDisplay';

const HomeContainer = styled('div')`
  display: flex;
  flex: 1;
  height: 100%;
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
	justifyContent: 'space-between',
	overflowY: 'auto',
	[theme.breakpoints.down("md")]: {
		flex: 1,
		height: '100%',
		backgroundColor: theme.palette.background.default,
	}
}))
const ForecastContainer = styled(Container)(({theme}) => ({
	display: 'flex',
	height: '70%',
	width: '100%',
	justifyContent: 'space-between',
	margin: '100px 0',
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		height: 'fit-content',
	}
}))
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
const ForecastItemWrapper = styled('div')`
  flex: 0.9;
  height: 250px;
  padding: 10px;
`


const Home = () => {
	const {
			  selectedLocation,
			  isLoading,
			  error,
			  currentWeather,
			  forecastDetails,
		  } = useAppSelector(({weatherData}) => weatherData)
	const dispatch = useAppDispatch();
	const getFavoriteIndicator = useFavoritesIndicator({location: selectedLocation})
	useEffect(() => {
		if (selectedLocation) {
			dispatch(getLocationWeatherDetails(selectedLocation.Key))
		}
	}, [dispatch, selectedLocation]);


	const renderWeatherContent = () => forecastDetails && selectedLocation && currentWeather && <>
		<StyledToolbar>
			<StyledBox>
				<Typography variant='h4'>
					{selectedLocation.LocalizedName}, {selectedLocation.Country.LocalizedName}
				</Typography>
				<CurrentWeatherDisplay currentWeather={currentWeather}/>
				<Typography variant='body1'>
					{forecastDetails.Headline.Text}
				</Typography>
			</StyledBox>
			<StyledBox>
				{getFavoriteIndicator()}
			</StyledBox>
		</StyledToolbar>
		<ForecastContainer>
			{forecastDetails.DailyForecasts.map((forecast) => <ForecastItemWrapper key={forecast.Date}>
					<ForecastItem
						dailyForecast={forecast}/>
				</ForecastItemWrapper>
			)}
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
