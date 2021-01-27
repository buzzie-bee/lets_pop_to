import React, { useEffect, useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchFlights } from './fetchFlights';
import { Flight } from './Flight';

interface PlaceType {
  iataCode: string;
  locationName: string;
  cityName: string;
  countryName: string;
  weather: {};
}

const Flights = () => {
  const params: any = useParams();
  const from: PlaceType = JSON.parse(params.from);
  const to: PlaceType = JSON.parse(params.to);
  const dates: string[] = JSON.parse(params.dates);

  const [loading, setLoading] = useState<boolean>(false);
  const [flights, setFlights] = useState<any[]>([]);

  useEffect(() => {
    fetchFlights({
      from: from.iataCode,
      to: to.iataCode,
      dates: dates,
      setLoading: setLoading,
      setFlights: setFlights,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {flights.length && flights.map((flight) => <Flight {...flight} />)}
      <div style={{ marginTop: '300px', marginBottom: '300px' }} />
      <Container maxWidth="lg">
        <div>Loading: {loading ? 'true' : 'false'}</div>
        <div>
          <pre>{JSON.stringify(flights, null, 2)}</pre>
        </div>
      </Container>
      <Container maxWidth="lg">
        <Paper>Hello There</Paper>
        <Paper>
          <pre>{JSON.stringify(from, null, 2)}</pre>
        </Paper>
        <Paper>
          <pre>{JSON.stringify(to, null, 2)}</pre>
        </Paper>
        <Paper>
          <pre>{JSON.stringify(dates, null, 2)}</pre>
        </Paper>
      </Container>
    </>
  );
};

export default Flights;
