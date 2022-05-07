import React, {useEffect, useState} from 'react';
import {AccuweatherLocation, CurrentWeather} from '../types';
import {getCurrentWeather} from '../api';
import {Card, CardActions, CardMedia, CircularProgress, styled, Typography} from '@mui/material';
import CurrentWeatherDisplay from './CurrentWeatherDisplay';
import {codeToImageMap} from '../constants';
import {useFavoritesIndicator} from '../app/hooks';

interface Props {
	location: AccuweatherLocation
	onFetchError: (e: any) => any
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 10px;

`
const ItemHeader = styled('div')`flex: 1`
const ItemImage = styled('div')`
  flex: 1;
  width: 80%;
  align-items: center;`
const StyledCardActions = styled(CardActions)`flex: 1`

const FavoriteItem: React.FC<Props> = ({location, onFetchError}) => {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const getFavoriteIndicator = useFavoritesIndicator({location})
	useEffect(() => {
		const fetchWeather = async () => {
			setIsLoading(true)
			const {data, error} = await getCurrentWeather({
				locationKey: location.Key,
				useMock: true,
				throwError: false
			})
			if (error) {
				onFetchError(error)
			}
			if (data && !error) {
				setCurrentWeather(data[0])
			}
			setIsLoading(false)
		}
		fetchWeather()
	}, []);

	return <StyledCard color='primary'>
		{isLoading ?
		 <CircularProgress/> : <>
			 <ItemHeader>
				 <Typography variant='h5'>
					 {location.LocalizedName}, {location.Country.LocalizedName}
				 </Typography>
				 {currentWeather && <CurrentWeatherDisplay currentWeather={currentWeather}/>}
			 </ItemHeader>
			 <ItemImage>{currentWeather && <CardMedia
				 className='card-media'
				 component="img"
				 image={codeToImageMap[currentWeather.WeatherIcon]}
				 alt={currentWeather.WeatherText}
			 />
			 }</ItemImage>
			 <StyledCardActions>
				 {getFavoriteIndicator()}
			 </StyledCardActions>
		 </>
		}
	</StyledCard>;
};

export default FavoriteItem;
