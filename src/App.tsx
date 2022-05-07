import React, {useEffect} from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Favorites from './views/Favorites';
import Home from './views/Home';
import {LOCAL_STORAGE_KEYS, ROUTES} from './constants';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Navbar from './components/Navbar';
import {setFavoriteLocations} from './reducer/weatherDataReducer';


const AppContainer = styled('div')(({theme}) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	backgroundColor: theme.palette.background.default
}))


function App() {
	const {themeMode} = useAppSelector(({layout}) => layout)
	const dispatch = useAppDispatch();
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

	}, []);


	return (
		<ThemeProvider theme={theme}>
			<AppContainer>
				<Navbar/>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home/>}/>
					<Route path={ROUTES.FAVORITES} element={<Favorites/>}/>
				</Routes>
			</AppContainer>
		</ThemeProvider>
	);
}

export default App;
