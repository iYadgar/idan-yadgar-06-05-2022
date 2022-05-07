import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Autocomplete, CircularProgress, debounce, Snackbar, TextField} from '@mui/material';
import {AccuweatherLocation} from '../types';
import {getAutocompleteLocations} from '../api';
import {useAppDispatch} from '../app/hooks';
import {setSelectedLocation} from '../reducer/weatherDataReducer';


const SearchBarAutocomplete = () => {
		  const [isOpen, setIsOpen] = useState(false);
		  const [options, setOptions] = React.useState<AccuweatherLocation[]>([]);
		  const [searchTerm, setSearchTerm] = useState('');
		  const [openErrorToast, setOpenErrorToast] = useState(false);
		  const dispatch = useAppDispatch();
		  const shouldRequest = useRef(true);
		  const loading = useMemo(() => isOpen && options.length === 0, [isOpen, options.length]);
		  const searchDelayed = useMemo(
			  () => debounce((value) => {
				  setSearchTerm(value)
			  }, 300),
			  []
		  );
		  useEffect(() => {
				  const getOptions = async () => {
					  if (searchTerm && shouldRequest.current) {
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
				  getOptions()
			  }, [searchTerm]
		  )
		  const onLocationSelect = (value: any) => {
			  shouldRequest.current = false
			  dispatch(setSelectedLocation(value))
		  }


		  return (
			  <><Autocomplete
				  sx={{width: 300}}
				  open={isOpen}
				  onClose={() => {
					  setIsOpen(false);
				  }}
				  filterOptions={(x) => x}
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
