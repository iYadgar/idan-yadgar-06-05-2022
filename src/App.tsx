import React, {useEffect} from 'react';
import {
	AppBar,
	createTheme,
	IconButton, styled,
	ThemeProvider,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	Typography
} from '@mui/material';
import {DarkMode, Favorite, Home as HomeIcon, LightMode} from '@mui/icons-material';
import {Route, Routes, useNavigate} from "react-router-dom";
import Favorites from './views/Favorites';
import Home from './views/Home';
import {LOCAL_STORAGE_KEYS, ROUTES} from './constants';
import {ThemeMode} from './types';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {setThemeMode} from './reducer/layoutReducer';


const AppContainer = styled('div')(({theme}) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	backgroundColor: theme.palette.background.default
}))

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ToolbarButtonsContainer = styled('div')`
  display: flex;
  align-items: center;
  min-width: 15%;
  justify-content: space-between;
`
const NavButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-between;`


function App() {
	const navigate = useNavigate()
	const {themeMode} = useAppSelector(({layout}) => layout)
	const dispatch = useAppDispatch();
	const theme = createTheme({
		palette: {
			mode: themeMode,
		}
	});
	useEffect(() => {
		const themeMode: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
		if (themeMode) {
			updateTheme(themeMode as ThemeMode)
		}
	}, []);
	const updateTheme = (themeMode: ThemeMode) => {
		dispatch(setThemeMode({themeMode}))
	}
	const handleThemeToggle = (themeMode: ThemeMode) => {
		if (themeMode) {
			updateTheme(themeMode)
			localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, themeMode)
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<AppContainer>
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
