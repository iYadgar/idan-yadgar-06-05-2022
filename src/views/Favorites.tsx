import React, {useState} from 'react';
import {useAppSelector} from '../app/hooks';
import FavoriteItem from '../components/FavoriteItem';
import {Alert, Snackbar, styled} from '@mui/material';

const StyledContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 20px 0;
`
const ItemContainer = styled('div')`
  margin: 20px;
  height: 250px;
  width: 200px;
`

const Favorites = () => {
	const {favoriteLocations} = useAppSelector(({weatherData}) => weatherData)
	const [openErrorToast, setOpenErrorToast] = useState(false);
	const onFetchWeatherError = (error: any) => {
		setOpenErrorToast(true)
		console.error(error)
	}
	return (
		<StyledContainer>
			{favoriteLocations.map((location) => <ItemContainer key={location.Key}>
				<FavoriteItem onFetchError={onFetchWeatherError} location={location}/>
			</ItemContainer>)}
			<Snackbar open={openErrorToast} autoHideDuration={3000}
					  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
					  onClick={() => setOpenErrorToast(false)}>
				<Alert severity="error">
					There was a problem fetching weather data
				</Alert>
			</Snackbar>

		</StyledContainer>
	);
};

export default Favorites;
