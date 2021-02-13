import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Grid,
  makeStyles,
  Typography,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { LocationOn } from '@material-ui/icons';
import axios from 'axios';

import { InspireMeStateType, PlaceOptionType } from '../../type';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

interface PlaceInputProps {
  from?: PlaceOptionType;
  handleSetFrom: (from: PlaceOptionType) => void;
}

export const PlaceInput: React.FC<PlaceInputProps> = ({
  from,
  handleSetFrom,
}) => {
  const { from: fromRedux }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceOptionType | null>(
    fromRedux ? fromRedux : null
  );
  const [suggestedPlaces, setSuggestedPlaces] = useState<any[]>([]);

  const classes = useStyles();

  const fetchAutoSuggestions = async (value: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/getAutoCompleteSuggestions?value=${value}`
      );
      setSuggestedPlaces(response.data.places);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(selectedPlace);
    if (selectedPlace) {
      console.log('setting');
      setInputValue(
        `${selectedPlace.placeName}, ${
          selectedPlace.regionId ? `${selectedPlace.regionId}, ` : ''
        }${selectedPlace.countryName}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inputValue.length) {
      fetchAutoSuggestions(inputValue);
    }
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      id="from"
      options={suggestedPlaces}
      loading={loading}
      getOptionLabel={(place) =>
        `${place.placeName}, ${place.regionId ? `${place.regionId}, ` : ''}${
          place.countryName
        }`
      }
      style={{ width: 300 }}
      disableClearable
      onInputChange={(event: any, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      onChange={(event: any, newValue: PlaceOptionType) => {
        setSelectedPlace(newValue);
        handleSetFrom(newValue);
      }}
      renderInput={(params) => {
        if ('value' in params.inputProps) {
          //@ts-ignore - MUI make it difficult to access the value of this text input
          // TS kicks off because it doesn't think value exists even though we're checking it
          params.inputProps.value = inputValue;
        }
        return (
          <TextField
            {...params}
            label="From"
            value="123456"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </>
              ),
            }}
          />
        );
      }}
      renderOption={(place) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOn className={classes.icon} />
            </Grid>
            <Grid item xs>
              <span style={{}}>{place.placeName}</span>
              <Typography variant="body2" color="textSecondary">
                {place.countryName}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default PlaceInput;
