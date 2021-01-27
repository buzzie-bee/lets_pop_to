import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Paper, Typography } from '@material-ui/core';

import DestinationGrid from './DestinationGrid';
import { useParams } from 'react-router-dom';
import { Filters } from './Filters/Filters';
import { FiltersStateType } from './Filters/filtersSlice';
import { RootState } from '../../redux/store';

const BrowseInspiredFlights: React.FC = () => {
  const params: any = useParams();
  const from = JSON.parse(params.from);
  const dates = JSON.parse(params.dates);
  // TODO: add error checking here to validate search query

  const { direct, priceRange }: FiltersStateType = useSelector(
    (state: RootState) => state.filters
  );

  return (
    <>
      <Divider />
      <Paper
        elevation={0}
        style={{ padding: '2%', marginTop: '0.5em', minHeight: '100%' }}
      >
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

export default BrowseInspiredFlights;
