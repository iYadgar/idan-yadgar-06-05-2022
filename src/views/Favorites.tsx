import React from 'react';
import {useAppSelector} from '../app/hooks';

const Favorites = () => {
	const {
			  favoriteLocations
		  } = useAppSelector(({weatherData}) => weatherData)
	return (
		<div>
			{favoriteLocations.map((location) => <div>{location.LocalizedName}, {location.Country.LocalizedName}</div>)}
		</div>
	);
};

export default Favorites;
