import { Button, ButtonGroup, makeStyles } from '@material-ui/core';
import React from 'react';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

import { setTripType as setTripTypeRedux } from './slice/inspireMeSlice';
import { InspireMeStateType } from '../../type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const TripType = ({ large }: { large: boolean }) => {
  const { tripType }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  const dispatch = useDispatch();

  const classes = useStyles();

  const setTripType = (tripType: '' | 'oneWay' | 'return') => {
    dispatch(setTripTypeRedux(tripType));
  };
  return (
    <ButtonGroup size={large ? 'large' : 'small'} aria-label="button group">
      <Button
        startIcon={
          tripType === 'oneWay' ? (
            <CheckCircleOutlineRoundedIcon className={classes.icon} />
          ) : (
            ''
          )
        }
        onClick={() => {
          setTripType('oneWay');
        }}
      >
        One-Way
      </Button>
      <Button
        endIcon={
          tripType === 'return' ? (
            <CheckCircleOutlineRoundedIcon className={classes.icon} />
          ) : (
            ''
          )
        }
        onClick={() => {
          setTripType('return');
        }}
      >
        Return
      </Button>
    </ButtonGroup>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    color: '#9933cc',
  },
}));
