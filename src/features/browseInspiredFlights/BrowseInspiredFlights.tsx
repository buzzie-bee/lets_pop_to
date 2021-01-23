import React, { useState } from 'react';
import { Container, Divider, Paper } from '@material-ui/core';

import DestinationGrid from './DestinationGrid';
import { useParams } from 'react-router-dom';
import { Filters } from './Filters';

const BrowseInspiredFlights: React.FC = () => {
  const params: any = useParams();
  const from = JSON.parse(params.from);
  const dates = JSON.parse(params.dates);
  // TODO: add error checking here to validate search query

  // const [minPrice, setMinPrice] = useState<number>(0);
  // const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [direct, setDirect] = useState<boolean>(false);

  return (
    <>
      <Divider />
      <Paper
        elevation={0}
        style={{ padding: '2%', marginTop: '0.5em', minHeight: '100%' }}
      >
        <Container maxWidth="lg">
          <Filters direct={direct} setDirect={setDirect} />
          <div style={{ height: '200px' }} />
          <div>{`Direct: ${direct}`}</div>
        </Container>

        <DestinationGrid from={from} dates={dates} />
      </Paper>
    </>
  );
};

export default BrowseInspiredFlights;
