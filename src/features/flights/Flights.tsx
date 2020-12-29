import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container } from '@material-ui/core';

// import { getFlights } from './flightsSlice';
import { fetchFlights } from './flightsSlice';
import { RootState } from '../../redux/store';
import { Flight } from './Flight';
import { FlightsType } from '../../type';

export const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const flights: FlightsType = useSelector((state: RootState) => state.flights);

  // const directFlightQuotes = flights.quotes?.filter((quote) => quote.direct);

  const handleButton = (): void => {
    // dispatch(getFlights());
    dispatch(fetchFlights());
  };

  console.log(flights);
  return (
    <Container>
      <h2>Flights Here</h2>
      <Button onClick={handleButton}>Get Flights</Button>
      {flights.loaded &&
        flights.quotes?.map((quote, idx) => (
          <Flight index={idx} key={quote.quoteId} />
        ))}
    </Container>
  );
};
