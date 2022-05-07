import React, {useEffect, useState} from 'react';
import {Alert, createTheme, Snackbar, styled, ThemeProvider} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Favorites from './views/Favorites';
import Home from './views/Home';
import {DEFAULT_LOCATION, LOCAL_STORAGE_KEYS, ROUTES} from './constants';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from './components/Navbar';
import {setFavoriteLocations, setSelectedLocation} from './reducer/weatherDataReducer';
import {getLocationFromCoordinates} from './api';


const AppContainer = styled('div')(({theme}) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	backgroundColor: theme.palette.background.default
}))


function App() {
	const {themeMode} = useAppSelector(({layout}) => layout)
	const dispatch = useAppDispatch();
	const [openErrorToast, setOpenErrorToast] = useState(false);
	const theme = createTheme({
		palette: {
			mode: themeMode,
		}
	});
	useEffect(() => {
		const favoriteLocationsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES)
		if (favoriteLocationsFromLocalStorage) {
			const locations = JSON.parse(favoriteLocationsFromLocalStorage)
			dispatch(setFavoriteLocations({locations}))

		}
		navigator.geolocation.getCurrentPosition(async ({coords}: GeolocationPosition) => {
			const {
					  data: location,
					  error
				  } = await getLocationFromCoordinates({
				coordinates: `${coords.latitude},${coords.longitude}`,
				throwError: false
			})
			if (error) {
				setOpenErrorToast(true)
				console.error(error)
			}
			if (location) {
				dispatch(setSelectedLocation({location}))
			}
		}, () => {
			dispatch(setSelectedLocation({location: DEFAULT_LOCATION}))
		})
	}, []);


	return (
		<ThemeProvider theme={theme}>
			<AppContainer>
				<Navbar/>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home/>}/>
					<Route path={ROUTES.FAVORITES} element={<Favorites/>}/>
				</Routes>
				<Snackbar open={openErrorToast} autoHideDuration={3000}
						  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
						  onClick={() => setOpenErrorToast(false)}>
					<Alert severity="error">
						Something went wrong
					</Alert>
				</Snackbar>
			</AppContainer>
		</ThemeProvider>
	);
}

export default App;
