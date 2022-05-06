import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import styled from 'styled-components';
import SearchBarAutocomplete from '../components/SearchBarAutocomplete';

const HomeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 2% 5%;
`
const Home = () => {
	const meow = [{label: 'blah', id: 1}, {label: 'meow', id: 2}]
	return (<HomeContainer>
			<SearchBarAutocomplete/>
		</HomeContainer>
	);
}


export default Home;
