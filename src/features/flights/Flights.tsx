import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container } from '@material-ui/core';

// import { getFlights } from './flightsSlice';
import { fetchBrowseFlights } from './flightsSlice';
import { RootState } from '../../redux/store';
// import { Flight } from './Flight';
import { Inspire } from './Inspire';
import { FlightsType } from '../../type';

export const Flights: React.FC = () => {
  const dispatch = useDispatch();
  const flights: FlightsType = useSelector((state: RootState) => state.flights);

  const handleButton = (): void => {
<<<<<<< HEAD
=======
    // dispatch(getFlights());
>>>>>>> e8d08dd6f092a8c522901988b1c48782d8b33b40
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
      <Inspire key={`flight#${1}`} {...flightTemp} />
    </Container>
  );
};
