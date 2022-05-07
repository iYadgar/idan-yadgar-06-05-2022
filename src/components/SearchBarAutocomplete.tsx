import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Autocomplete, CircularProgress, debounce, Snackbar, TextField} from '@mui/material';
import {AccuweatherLocation} from '../types';
import {getAutocompleteLocations} from '../api';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setSelectedLocation} from '../reducer/weatherDataReducer';


const SearchBarAutocomplete = () => {
		  const {selectedLocation} = useAppSelector(({weatherData}) => weatherData)
		  const [isOpen, setIsOpen] = useState(false);
		  const [options, setOptions] = React.useState<AccuweatherLocation[]>([]);
		  const [searchTerm, setSearchTerm] = useState('');
		  const [openErrorToast, setOpenErrorToast] = useState(false);
		  const dispatch = useAppDispatch();
		  const loading = useMemo(() => isOpen && options.length === 0, [isOpen, options.length]);
		  const searchDelayed = useMemo(
			  () => debounce((value) => {
				  setSearchTerm(value)
			  }, 300),
			  []
		  );
		  useEffect(() => {
				  const getOptions = async () => {
					  if (searchTerm) {
						  let shouldRequest;
						  if (selectedLocation) {
							  shouldRequest = !(selectedLocation.LocalizedName === searchTerm.slice(0, searchTerm.indexOf(',')))
						  }
						  if (shouldRequest) {
							  setIsOpen(true)
							  const {data, error} = await getAutocompleteLocations({searchTerm, throwError: false, useMock: true})
							  if (error) {
								  setOpenErrorToast(true);
								  setIsOpen(false)
							  }
							  if (data) {
								  setOptions(data)
							  }
						  }
					  }
				  }
				  getOptions()
			  }, [searchTerm]
		  )
		  const onLocationSelect = (value: any) => {
			  dispatch(setSelectedLocation(value))
		  }


		  return (
			  <><Autocomplete
				  sx={{width: 300}}
				  open={isOpen}
				  onClose={() => {
					  setIsOpen(false);
				  }}
				  isOptionEqualToValue={(option, value) => option.Key === value.Key}
				  getOptionLabel={(option) => `${option.LocalizedName}, ${option.Country.LocalizedName}`}
				  options={options}
				  loading={loading}
				  onInputChange={(e, value) => searchDelayed(value)}
				  onChange={(event, location) => location && onLocationSelect({location})}
				  renderInput={(params) => (
					  <TextField
						  {...params}
						  label="Search for location"
						  InputProps={{
							  ...params.InputProps,
							  endAdornment: (
								  <>
									  {loading ? <CircularProgress color="inherit" size={20}/> : null}
									  {params.InputProps.endAdornment}
								  </>
							  ),
						  }}
					  />
				  )}
			  />
				  <Snackbar open={openErrorToast} autoHideDuration={3000}
							anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
							onClick={() => setOpenErrorToast(false)}>
					  <Alert severity="error">
						  There was a problem fetching locations
					  </Alert>
				  </Snackbar>
			  </>);
	  }
;

export default SearchBarAutocomplete;
