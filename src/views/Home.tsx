import React, {useEffect, useState} from 'react';
import SearchBarAutocomplete from '../components/SearchBarAutocomplete';
import {Alert, Box, CircularProgress, Container, Snackbar, styled, Toolbar, Typography} from '@mui/material';
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
	[theme.breakpoints.down("md")]: {
		flex: 1,
		height: '100%',
		backgroundColor: theme.palette.background.default,
		overflowY: 'auto',
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
const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const StyledBox = styled(Box)`
  flex: 1;
  height: 100%;
  justify-content: space-between;
`
const ForecastItemWrapper = styled('div')`
  flex: 1;
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
			  unitSystem
		  } = useAppSelector(({weatherData}) => weatherData)
	const [openErrorToast, setOpenErrorToast] = useState(false);
	const dispatch = useAppDispatch();
	const getFavoriteIndicator = useFavoritesIndicator({location: selectedLocation})
	useEffect(() => {
		if (selectedLocation) {
			dispatch(getLocationWeatherDetails({locationKey: selectedLocation.Key, unitSystem}))
		}
	}, [dispatch, selectedLocation, unitSystem]);
	useEffect(() => {
		if (error) {
			setOpenErrorToast(true)
			console.error(error)
		}
	}, [error]);


	const renderWeatherContent = () => forecastDetails && selectedLocation && currentWeather && <>
		<Header>
			<StyledBox>
				<Box><Typography variant='h4'>
					{selectedLocation.LocalizedName}, {selectedLocation.Country.LocalizedName}
				</Typography>
					<CurrentWeatherDisplay currentWeather={currentWeather}/>
					<Typography variant='body1'>
						{forecastDetails.Headline.Text}
					</Typography></Box>
			</StyledBox>
			{getFavoriteIndicator()}

		</Header>
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
			<Snackbar open={openErrorToast} autoHideDuration={3000}
					  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
					  onClick={() => setOpenErrorToast(false)}>
				<Alert severity="error">
					There was a problem fetching weather data
				</Alert>
			</Snackbar>
		</HomeContainer>
	);
}


export default Home;
