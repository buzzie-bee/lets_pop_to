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
import { setFrom, setDates } from './slice/inspireMeSlice';
import {
  setHighestPrice,
  setPriceRange,
  setShowPriceFilter,
} from '../browseInspiredFlights/Filters/filtersSlice';
import { ROUTES } from '../../constants/routes';
import { SelectNewDates } from './SelectNewDates/SelectNewDates';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const InspireMe: React.FC = () => {
  const dispatch = useDispatch();
  const [tripType, setTripType] = useState<'oneWay' | 'return' | ''>('');
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
            disabled={false}
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
