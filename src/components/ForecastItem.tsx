import React from 'react';
import {DailyForecast} from '../types';
import {Card, styled, Typography} from '@mui/material';
import {codeToImageMap} from '../constants';
import {format} from 'date-fns';

interface Props {
	dailyForecast: DailyForecast
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 5px;

`
const ForecastHeader = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const ContentContainer = styled('div')(({theme}) => ({
	display: 'flex',
	flex: 2,
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: '100%',
	[theme.breakpoints.down('md')]: {
		flexDirection: 'row'
	}
}))
const ImageContainer = styled('div')(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	alignItems: 'center'
}))
const StyledImg = styled('img')(({theme}) => ({
	width: '50%',
	[theme.breakpoints.down('md')]: {
		width: '100%'
	}
}))


const ForecastItem: React.FC<Props> = ({dailyForecast}) => {
	const dayImage = codeToImageMap[dailyForecast.Day.Icon]
	const nightImage = codeToImageMap[dailyForecast.Night.Icon]
	return <StyledCard>

		<ForecastHeader>
			<Typography variant='h5'>
				{format(new Date(dailyForecast.Date), 'iiii')}
			</Typography>
			<Typography gutterBottom variant="body1">
				{dailyForecast.Temperature.Minimum.Value}<span>&#176;</span> - {dailyForecast.Temperature.Maximum.Value}<span>&#176;</span>
			</Typography>
		</ForecastHeader>
		<ContentContainer>
			<ImageContainer>
				<Typography variant='subtitle1' align='center'>
					{dailyForecast.Day.IconPhrase} at day
				</Typography>
				<StyledImg
					src={dayImage}
					alt={dailyForecast.Day.IconPhrase}
				/>
			</ImageContainer>
			<ImageContainer>
				<Typography variant='subtitle1' align='center'>
					{dailyForecast.Night.IconPhrase} at night
				</Typography>
				<StyledImg
					src={nightImage}
					alt={dailyForecast.Night.IconPhrase}
				/>
			</ImageContainer>
		</ContentContainer>
	</StyledCard>
};

export default ForecastItem;
