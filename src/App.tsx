import React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material';
import {Route, Routes} from "react-router-dom";
import Favorites from './views/Favorites';
import Home from './views/Home';
import {ROUTES} from './constants';
import {useAppSelector} from './app/hooks';
import Navbar from './components/Navbar';


const AppContainer = styled('div')(({theme}) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	backgroundColor: theme.palette.background.default
}))


function App() {
	const {themeMode} = useAppSelector(({layout}) => layout)
	const theme = createTheme({
		palette: {
			mode: themeMode,
		}
	});


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
