import React from 'react';
import {DailyForecast} from '../types';
import {Box, Card, CardContent, CardMedia, Grid, styled, Typography} from '@mui/material';
import {codeToImageMap} from '../constants';

interface Props {
	dailyForecast: DailyForecast
}

const StyledCard = styled(Card)`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  padding: 10px;
  align-items: center;

  .card-media {
    width: 70%;
  }
`
const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  padding: 16px 0 ;
`


const WeatherItem: React.FC<Props> = ({dailyForecast}) => {
	const dayImage = codeToImageMap[dailyForecast.Day.Icon]
	const nightImage = codeToImageMap[dailyForecast.Night.Icon]
	return <StyledCard>

		<Typography color='secondary' variant='body2'>
			{new Date(dailyForecast.Date).toDateString()}
		</Typography>
		<Typography color='secondary' gutterBottom variant="subtitle1">
			{dailyForecast.Temperature.Minimum.Value}<span>&#176;</span> - {dailyForecast.Temperature.Maximum.Value}<span>&#176;</span>
		</Typography>
		<StyledCardContent>
			<Box>

				<Typography variant='body2'>
					{dailyForecast.Day.IconPhrase} at day
				</Typography>
				<CardMedia
					className='card-media'
					component="img"
					image={dayImage}
					alt={dailyForecast.Day.IconPhrase}
				/>
			</Box>
			<Box>
				<Typography variant='body2'>
					{dailyForecast.Night.IconPhrase} at night
				</Typography>
				<CardMedia
					className='card-media'
					component="img"
					image={nightImage}
					alt={dailyForecast.Night.IconPhrase}
				/>
			</Box></StyledCardContent>
	</StyledCard>
};

export default WeatherItem;
