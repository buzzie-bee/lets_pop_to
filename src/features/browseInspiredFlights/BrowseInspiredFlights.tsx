import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Paper, Typography } from '@material-ui/core';

import { RootState } from '../../redux/store';
import { InspireMeStateType } from '../../type';
import DestinationGrid from './DestinationGrid';

const BrowseInspiredFlights: React.FC = () => {
  const { from }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
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
            <span style={{ fontWeight: 2 }}>Let's fly from </span>
            {from?.placeName}. . .
          </Typography>
          <Typography>Any weather is fine</Typography>
          <Typography>I don't care about price</Typography>
          <Typography>Who cares about stopovers?</Typography>
          <Typography>Let's go and never come back</Typography>
        </Container>

        <DestinationGrid />
      </Paper>
    </>
  );
};

export default BrowseInspiredFlights;
