import React from 'react';
import {useAppSelector} from '../app/hooks';
import FavoriteItem from '../components/FavoriteItem';
import {styled} from '@mui/material';

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
	const {
			  favoriteLocations
		  } = useAppSelector(({weatherData}) => weatherData)
	return (
		<StyledContainer>
			{favoriteLocations.map((location) => <ItemContainer key={location.Key}>
				<FavoriteItem  location={location}/>
			</ItemContainer>)}
		</StyledContainer>
	);
};

export default Favorites;
