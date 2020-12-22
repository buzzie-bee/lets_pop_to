import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { getFlights } from './flightsSlice';

interface State {
  flights: {
    flights: {
      Quotes: [];
      Places: [];
      Carriers: [];
      Currencies: [];
    };
  };
}

export const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state: State) => state.flights.flights);

  const handleButton = (): void => {
    dispatch(getFlights());
  };

  return (
    <Container>
      <h2>Flights Here</h2>
      <Button onClick={handleButton}>Get Flights</Button>
      {flights.Quotes ? 'Loaded' : 'Loading'}
    </Container>
  );
};
