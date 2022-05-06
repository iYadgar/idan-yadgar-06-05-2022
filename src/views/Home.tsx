import React, {useEffect} from 'react';
import SearchBarAutocomplete from '../components/SearchBarAutocomplete';
import {Box, CircularProgress, Container, styled, Toolbar, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getCurrentWeather} from '../reducer/homeReducer';

const HomeContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 2% 5%;
`
const StyledContainer = styled(Container)(({theme}) => ({
	position: 'relative',
	height: '60%',
	marginTop: '5%',
	backgroundColor: theme.palette.action.hover,
	opacity: 0.8,
	padding: '10px',
	color: theme.palette.text.primary,
	borderRadius: '10px'
}))
const StyledSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  right: 50%;
`

const Home = () => {
	const {selectedLocation, isLoading, error, currentWeather} = useAppSelector(({home}) => home)
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (selectedLocation) {
			dispatch(getCurrentWeather(selectedLocation.Key))
		}
	}, [dispatch, selectedLocation]);


	const renderWeatherContent = () => selectedLocation && currentWeather && <>
		<Toolbar>
			<Box>
				<Typography variant='h5'>
					{selectedLocation.LocalizedName}, {selectedLocation.Country.LocalizedName}
				</Typography>
				<Typography variant='h6'>
					{currentWeather.WeatherText}, {currentWeather.Temperature.Metric.Value}<span>&#176;</span>

				</Typography>

			</Box>

		</Toolbar>

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
