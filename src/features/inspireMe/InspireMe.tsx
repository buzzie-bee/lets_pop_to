import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, makeStyles, Paper } from '@material-ui/core';

import PlaceInput from './PlaceInput';
import { InspireMeStateType, PlaceOptionType } from '../../type';
import SelectDates from './SelectDates';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFrom, setDates } from './inspireMeSlice';
import { ROUTES } from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const InspireMe: React.FC = () => {
  const dispatch = useDispatch();
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
          <SelectDates handleSetDates={handleSetDates} />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            disabled={!valid}
            component={Link}
            to={ROUTES.INSPIRATION}
            // TODO: Remove this
            onClick={() => {
              console.log({ from, dates });
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
