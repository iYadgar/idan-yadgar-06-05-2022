import React, {useEffect, useState} from 'react';
import {
	AppBar,
	createTheme,
	IconButton,
	ThemeProvider,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	Typography
} from '@mui/material';
import styled from 'styled-components';
import {DarkMode, Favorite, LightMode, Home as HomeIcon} from '@mui/icons-material';
import {Route, Routes, useNavigate} from "react-router-dom";
import Favorites from './views/Favorites';
import Home from './views/Home';
import {LOCAL_STORAGE_KEYS, ROUTES} from './constants';


const AppContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${({isDarkMode}) => isDarkMode ? '#121212' : 'white'};
`
const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ToolbarButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 15%;
  justify-content: space-between;
`
const NavButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;`

type ThemeOptions = 'dark' | 'light';

function App() {
	const navigate = useNavigate()
	const [themeMode, setThemeMode] = useState<ThemeOptions>('dark');
	const theme = createTheme({
		palette: {
			mode: themeMode,
		}
	});
	useEffect(() => {
		const themeMode: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
		if (themeMode) {
			setThemeMode(themeMode as ThemeOptions)
		}
	}, []);

	const handleThemeToggle = (themeMode: ThemeOptions) => {
		setThemeMode(themeMode)
		localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, themeMode)
	}
	return (
		<ThemeProvider theme={theme}>
			<AppContainer isDarkMode={themeMode === 'dark'}>
				<AppBar position="static">
					<StyledToolbar>
						<Typography
							variant="h6"
							noWrap
							component="div"
						>
							Weather App
						</Typography>

						<ToolbarButtonsContainer>
							<NavButtonsContainer>
								<IconButton onClick={() => navigate(ROUTES.HOME)} size="large"
											aria-label="show 4 new mails" color="inherit">
									<HomeIcon/>
								</IconButton>
								<IconButton onClick={() => navigate(ROUTES.FAVORITES)} size="large"
											aria-label="show 4 new mails" color="inherit">
									<Favorite/>
								</IconButton>
							</NavButtonsContainer>
							<ToggleButtonGroup
								value={themeMode}
								onChange={(e, themeValue) => handleThemeToggle(themeValue)}
								exclusive
								aria-label="Dark/Light mode">
								<ToggleButton value="dark">
									<DarkMode/>
								</ToggleButton>
								<ToggleButton value="light">
									<LightMode/>
								</ToggleButton>
							</ToggleButtonGroup></ToolbarButtonsContainer>


					</StyledToolbar>
				</AppBar>
				<Routes>
					<Route path={ROUTES.HOME} element={<Home/>}/>
					<Route path={ROUTES.FAVORITES} element={<Favorites/>}/>
				</Routes>
			</AppContainer>
		</ThemeProvider>
	);
}

export default App;
