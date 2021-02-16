import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

import { DestinationGrid } from './DestinationGrid';
import { useParams } from 'react-router-dom';
import { Filters } from './Filters/Filters';
import { FiltersStateType } from './Filters/filtersSlice';
import { RootState } from '../../redux/store';

import { DateType, PlaceOptionType } from '../../type';

export const BrowseInspiredFlights = () => {
  const params: any = useParams();
  const from: PlaceOptionType = useMemo(() => JSON.parse(params.from), [
    params.from,
  ]);
  const dates: DateType[] = useMemo(() => JSON.parse(params.dates), [
    params.dates,
  ]);

  // TODO: add error checking here to validate search query
  const { direct, priceRange }: FiltersStateType = useSelector(
    (state: RootState) => state.filters
  );
  const classes = useStyles();

  return (
    <>
      <Divider />
      <Paper elevation={0} className={classes.headlinePaper}>
        <Container maxWidth="lg">
          <Typography variant="h4">
            Let's fly from {from.placeName} . . .
          </Typography>
          <Filters />
        </Container>

        <DestinationGrid
          from={from}
          dates={dates}
          directOnly={direct}
          priceRange={priceRange}
        />
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  headlinePaper: {
    padding: '24px',
    marginTop: '0.5em',
    minHeight: '100%',
  },
}));
