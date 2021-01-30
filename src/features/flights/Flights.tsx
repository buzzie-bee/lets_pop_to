import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchFlights } from './fetchFlights';
import { Flight } from './Flight';
import { Skeleton } from '@material-ui/lab';

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

  if (loading) {
    return (
      <Container maxWidth="md">
        <div style={{ margin: '8px' }}>
          <Typography variant="h5">
            Let's see what we can find . . .{' '}
          </Typography>
        </div>
        <Paper style={{ margin: '8px' }}>
          <Skeleton variant="rect" height={354} />
        </Paper>
      </Container>
    );
  }
  return (
    <Container maxWidth="md" style={{ marginBottom: '1rem' }}>
      <div style={{ margin: '8px' }}>
        <Typography variant="h4">Flights to {to.cityName}</Typography>
      </div>
      {flights.length &&
        flights.map((flight, index) => (
          <Flight key={`flight${index}`} {...flight} />
        ))}
    </Container>
  );
};

export default Flights;
