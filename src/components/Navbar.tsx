import React, {useEffect} from 'react';
import {AppBar, IconButton, styled, ToggleButton, ToggleButtonGroup, Toolbar, Typography} from '@mui/material';
import {LOCAL_STORAGE_KEYS, ROUTES} from '../constants';
import {DarkModeOutlined, HomeOutlined, LightModeOutlined, StarOutlineOutlined} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {ThemeMode} from '../types';
import {setThemeMode} from '../reducer/layoutReducer';

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
  justify-content: space-between;
  padding: 0 5px;
`

const Navbar = () => {
	const {themeMode} = useAppSelector(({layout}) => layout)
	const navigate = useNavigate()
	const dispatch = useAppDispatch();
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
	return <AppBar position="sticky">
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
						<HomeOutlined/>
					</IconButton>
					<IconButton onClick={() => navigate(ROUTES.FAVORITES)} size="large"
								aria-label="show 4 new mails" color="inherit">
						<StarOutlineOutlined/>
					</IconButton>
				</NavButtonsContainer>
				<ToggleButtonGroup
					value={themeMode}
					onChange={(e, themeValue) => handleThemeToggle(themeValue)}
					exclusive
					aria-label="Dark/Light mode">
					<ToggleButton value="dark">
						<DarkModeOutlined/>
					</ToggleButton>
					<ToggleButton value="light">
						<LightModeOutlined/>
					</ToggleButton>
				</ToggleButtonGroup></ToolbarButtonsContainer>


		</StyledToolbar>
	</AppBar>
		;
};

export default Navbar;
