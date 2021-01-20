import React from 'react';
import { Container, Divider, Paper, Typography } from '@material-ui/core';

import DestinationGrid from './DestinationGrid';
import { useParams } from 'react-router-dom';

const BrowseInspiredFlights: React.FC = () => {
  const params: any = useParams();
  const from = JSON.parse(params.from);
  const dates = JSON.parse(params.dates);
  // TODO: add error checking here to validate search query
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

        <DestinationGrid from={from} dates={dates} />
      </Paper>
    </>
  );
};

export default BrowseInspiredFlights;
