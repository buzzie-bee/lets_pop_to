import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

import { SelectNewDates } from './SelectNewDates/SelectNewDates';
import { PlaceInput } from './PlaceInput';

import { InspireMeStateType, PlaceOptionType } from '../../type';
import { RootState } from '../../redux/store';

import {
  setFrom,
  setTripType as setTripTypeRedux,
} from './slice/inspireMeSlice';
import { initialiseFilters } from '../browseInspiredFlights/Filters/filtersSlice';
import { ROUTES } from '../../constants/routes';

export const InspireMe = () => {
  const dispatch = useDispatch();
  const { tripType }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );

  const { from, dates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );

  const [valid, setValid] = useState<boolean>(false);

  const classes = useStyles();

  const checkValid = useCallback((): boolean => {
    if (from) {
      if (dates.length) {
        if (dates[0].outbound) {
          if (tripType) {
            return true;
          }
        }
      }
    }
    return false;
  }, [dates, from, tripType]);

  const handleSetFrom = (from: PlaceOptionType): void => {
    dispatch(setFrom(from));
  };

  const setTripType = (tripType: '' | 'oneWay' | 'return') => {
    dispatch(setTripTypeRedux(tripType));
  };

  useEffect(() => {
    setValid(checkValid());
  }, [from, dates, checkValid]);

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
              dispatch(initialiseFilters());
            }}
          >
            Inspire Me
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
