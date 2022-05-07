import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from './store';
import React, {useCallback, useMemo} from 'react';
import {AccuweatherLocation} from '../types';
import {IconButton} from '@mui/material';
import {Star, StarOutlineOutlined} from '@mui/icons-material';
import {toggleFavoriteLocation} from '../reducer/weatherDataReducer';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useFavoritesIndicator = ({location}: { location: AccuweatherLocation | null }) => {
	const {
			  favoriteLocations
		  } = useAppSelector(({weatherData}) => weatherData)
	const dispatch = useAppDispatch();
	const isInFavorites = useMemo(() => location && favoriteLocations.some((loc) => loc.Key === location.Key), [favoriteLocations, location]);
	const toggleLocationToFavorites = useCallback(
		() => {
			if (location) {
				dispatch(toggleFavoriteLocation({location}))
			}
		}
		,
		[dispatch, location],
	);

	return (className?: string) => <IconButton
		className={className || ''}
		onClick={toggleLocationToFavorites}
		size="large"
		aria-label="show 4 new mails" color="inherit">
		{isInFavorites ? <Star color='warning'/> : <StarOutlineOutlined/>}
	</IconButton>

}
