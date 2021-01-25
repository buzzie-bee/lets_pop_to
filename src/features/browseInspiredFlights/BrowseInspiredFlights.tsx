import React, { useState } from 'react';
import { Container, Divider, Paper, Typography } from '@material-ui/core';

import DestinationGrid from './DestinationGrid';
import { useParams } from 'react-router-dom';
import { Filters } from './Filters/Filters';

const BrowseInspiredFlights: React.FC = () => {
  const params: any = useParams();
  const from = JSON.parse(params.from);
  const dates = JSON.parse(params.dates);
  // TODO: add error checking here to validate search query

  const [direct, setDirect] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [highestPrice, setHighestPrice] = useState<number>(0);

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
          <Filters
            setDirect={setDirect}
            setPriceRange={setPriceRange}
            highestPrice={highestPrice}
          />
          <div>{`Direct: ${direct}`}</div>
        </Container>

        <DestinationGrid
          from={from}
          dates={dates}
          directOnly={direct}
          setHighestPrice={setHighestPrice}
        />
      </Paper>
    </>
  );
};

export default BrowseInspiredFlights;
