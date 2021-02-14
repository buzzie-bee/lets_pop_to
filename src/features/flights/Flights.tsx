import React, { useEffect, useMemo, useState } from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchFlights } from './fetchFlights';
import { Flight } from './Flight';
import { Skeleton } from '@material-ui/lab';
import { DateType } from '../../type';

interface PlaceType {
  iataCode: string;
  locationName: string;
  cityName: string;
  countryName: string;
  weather: {};
}

export const Flights = () => {
  const params: any = useParams();
  const from: PlaceType = useMemo(() => JSON.parse(params.from), [params.from]);
  const to: PlaceType = useMemo(() => JSON.parse(params.to), [params.to]);
  const dates: DateType[] = useMemo(() => JSON.parse(params.dates), [
    params.dates,
  ]);

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
  }, [dates, from.iataCode, to.iataCode]);

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
