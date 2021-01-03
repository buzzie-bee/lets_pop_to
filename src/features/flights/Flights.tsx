import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container } from '@material-ui/core';

// import { getFlights } from './flightsSlice';
import { fetchBrowseFlights } from './flightsSlice';
import { RootState } from '../../redux/store';
import { Flight } from './Flight';
import { FlightsType } from '../../type';

export const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const flights: FlightsType = useSelector((state: RootState) => state.flights);

  // const directFlightQuotes = flights.quotes?.filter((quote) => quote.direct);

  const handleButton = (): void => {
    // dispatch(getFlights());
    dispatch(
      fetchBrowseFlights({
        country: 'UK',
        currency: 'GBP',
        locale: 'en-GB',
        originPlace: 'MAN-sky',
        destinationPlace: 'anywhere',
        outboundPartialDate: 'anytime',
      })
    );
  };

  console.log(flights);
  const flightTemp = flights.flights[0];
  return (
    <Container>
      <h2>Flights Here</h2>
      <Button onClick={handleButton}>Get Flights</Button>
      {/* {flights.loaded &&
        flights.flights.map((flight, index) => (
          <Flight key={`flight#${index}`} {...flight} />
        ))} */}
      <Flight key={`flight#${1}`} {...flightTemp} />
    </Container>
  );
};
