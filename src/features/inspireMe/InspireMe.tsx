import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

import PlaceInput from './PlaceInput';
import { InspireMeStateType, PlaceOptionType } from '../../type';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFrom,
  setDates,
  setTripType as setTripTypeRedux,
} from './slice/inspireMeSlice';
import {
  setHighestPrice,
  setPriceRange,
  setShowPriceFilter,
} from '../browseInspiredFlights/Filters/filtersSlice';
import { ROUTES } from '../../constants/routes';
import { SelectNewDates } from './SelectNewDates/SelectNewDates';
import { ok } from 'assert';
import { negate } from 'lodash';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const InspireMe: React.FC = () => {
  const dispatch = useDispatch();
  const { tripType }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  // const [tripType, setTripType] = useState<'oneWay' | 'return' | ''>('');
  const { from, dates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [valid, setValid] = useState<boolean>(false);

  const classes = useStyles();

  const checkValid = (): boolean => {
    if (from) {
      if (dates.length) {
        return true;
      }
    }
    return false;
  };

  const handleSetFrom = (from: PlaceOptionType): void => {
    dispatch(setFrom(from));
  };

  const handleSetDates = (dates: Date[]): void => {
    const serializeableDates = dates.map(
      (date) => `${date.toISOString().substr(0, 10)}`
    );
    dispatch(setDates(serializeableDates));
  };

  const setTripType = (tripType: '' | 'oneWay' | 'return') => {
    dispatch(setTripTypeRedux(tripType));
  };

  useEffect(() => {
    setValid(checkValid());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, dates]);

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <PlaceInput handleSetFrom={handleSetFrom} />
        </Grid>
        <Grid item>
          <ButtonGroup size="large" aria-label="button group">
            <Button
              // variant={directional === 'oneWay' ? 'contained' : 'outlined'}
              startIcon={
                tripType === 'oneWay' ? <CheckCircleOutlineRoundedIcon /> : ''
              }
              onClick={() => {
                setTripType('oneWay');
              }}
            >
              One-Way
            </Button>
            <Button
              endIcon={
                tripType === 'return' ? <CheckCircleOutlineRoundedIcon /> : ''
              }
              onClick={() => {
                setTripType('return');
              }}
            >
              Return
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <SelectNewDates
            handleSetDates={handleSetDates}
            tripType={tripType}
            disabled={tripType.length === 0}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            disabled={!valid}
            component={Link}
            to={`${ROUTES.INSPIRATION_PREFIX}/${JSON.stringify(
              from
            )}/${JSON.stringify(dates)}`}
            onClick={() => {
              dispatch(setShowPriceFilter(false));
              dispatch(setPriceRange([0, 100000]));
              dispatch(setHighestPrice(0));
            }}
          >
            Inspire Me
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InspireMe;

// ng
// https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchInspireDestinations?from={%22placeId%22:%22MUC-sky%22,%22placeName%22:%22Munich%22,%22countryId%22:%22DE-sky%22,%22regionId%22:%22%22,%22cityId%22:%22MUNI-sky%22,%22countryName%22:%22Germany%22}&dates=[{%22outbound%22:%222021-06-4%22,%22inbound%22:%222021-06-13%22},{%22outbound%22:%222021-06-11%22,%22inbound%22:%222021-06-19%22},{%22outbound%22:%222021-06-18%22,%22inbound%22:%222021-06-26%22},{%22outbound%22:%222021-06-25%22,%22inbound%22:%222021-07-3%22},{%22outbound%22:%222021-06-4%22,%22inbound%22:%222021-06-12%22},{%22outbound%22:%222021-06-11%22,%22inbound%22:%222021-06-20%22},{%22outbound%22:%222021-06-18%22,%22inbound%22:%222021-06-27%22},{%22outbound%22:%222021-06-25%22,%22inbound%22:%222021-07-4%22}]
// ok
// https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchInspireDestinations?from={%22placeId%22:%22MUC-sky%22,%22placeName%22:%22Munich%22,%22countryId%22:%22DE-sky%22,%22regionId%22:%22%22,%22cityId%22:%22MUNI-sky%22,%22countryName%22:%22Germany%22}&dates=[{%22outbound%22:%222021-06-10%22,%22inbound%22:%222021-06-19%22}]
