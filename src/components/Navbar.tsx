import React, {useEffect, useState} from 'react';
import {
	AppBar, Box,
	Button, Grid,
	IconButton, Menu,
	MenuItem,
	styled,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	Typography
} from '@mui/material';
import {LOCAL_STORAGE_KEYS, ROUTES} from '../constants';
import {
	DarkModeOutlined,
	HomeOutlined,
	LightModeOutlined,
	MenuOutlined,
	StarOutlineOutlined
} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {ThemeMode, UnitOptions} from '../types';
import {setThemeMode} from '../reducer/layoutReducer';
import {setUnitSystem} from '../reducer/weatherDataReducer';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ToolbarButtonsContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 15%;

  .unit-buttons {
    margin: 0 5%;
  }
`
const NavButtonsContainer = styled('div')`
  display: flex;
  padding: 0 5px;
`
const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
	display: flex;
  width: 100%;
`
const StyledToggleButton = styled(ToggleButton)`
	flex: 1;
`

const Navbar = () => {
	const {layout: {themeMode}, weatherData: {unitSystem}} = useAppSelector((state) => state)
	const navigate = useNavigate()
	const dispatch = useAppDispatch();
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	useEffect(() => {
		const themeMode: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
		const unit: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.WEATHER_UNIT)
		if (themeMode) {
			updateTheme(themeMode as ThemeMode)
		}
		if (unit) {
			updateWeatherUnit(unit as UnitOptions)
		}
	}, []);

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};
	const updateTheme = (themeMode: ThemeMode) => {
		dispatch(setThemeMode({themeMode}))
	}
	const updateWeatherUnit = (unit: UnitOptions) => {
		dispatch(setUnitSystem({unit}))
	}
	const isMenuOpen = Boolean(menuAnchorEl);
	const renderOptionsMenu = () => <>
		<IconButton
			id="basic-button"
			aria-controls={isMenuOpen ? 'basic-menu' : undefined}
			aria-haspopup="true"
			aria-expanded={isMenuOpen ? 'true' : undefined}
			onClick={handleMenuClick}
		>
			<MenuOutlined/>
		</IconButton>
		<Menu
			id="basic-menu"
			anchorEl={menuAnchorEl}
			open={isMenuOpen}
			onClose={handleMenuClose}
			MenuListProps={{
				'aria-labelledby': 'basic-button',
			}}
		>
			<MenuItem>
				<StyledToggleButtonGroup
					className='unit-buttons'
					value={unitSystem}
					onChange={(e, unit) => unit && updateWeatherUnit(unit)}
					exclusive
					aria-label="Metric/Imperial system">
					<StyledToggleButton value="metric">
						C<span>&#176;</span>
					</StyledToggleButton>
					<StyledToggleButton value="imperial">
						F<span>&#176;</span>
					</StyledToggleButton>
				</StyledToggleButtonGroup>

			</MenuItem>
			<MenuItem>
				<ToggleButtonGroup
					value={themeMode}
					onChange={(e, themeValue) => themeValue && updateTheme(themeValue)}
					exclusive
					aria-label="Dark/Light mode">
					<ToggleButton value="dark">
						<DarkModeOutlined/>
					</ToggleButton>
					<ToggleButton value="light">
						<LightModeOutlined/>
					</ToggleButton>
				</ToggleButtonGroup>
			</MenuItem>

		</Menu>
	</>

	return <AppBar position="sticky">
		<StyledToolbar>
			<Grid container direction='row' alignItems='center'>
				{renderOptionsMenu()}
				<Typography
					variant="h6"
					noWrap
					component="div"
				>
					Weather App
				</Typography></Grid>

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

			</ToolbarButtonsContainer>


		</StyledToolbar>
	</AppBar>
		;
};

export default Navbar;
