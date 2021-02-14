import React, { useEffect, useMemo, useState } from 'react';
import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { fetchFlights } from './fetchFlights';
import { FlightCard } from './FlightCard/FlightCard';
import { Skeleton } from '@material-ui/lab';
import { DateType, FlightType } from '../../type';

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
  const [flights, setFlights] = useState<FlightType[]>([]);

  const classes = useStyles();

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
        <div className={classes.loading}>
          <Typography variant="h5">
            Let's see what we can find . . .{' '}
          </Typography>
        </div>
        <Paper className={classes.loading}>
          <Skeleton variant="rect" height={354} />
        </Paper>
      </Container>
    );
  }
  return (
    <Container maxWidth="md" className={classes.flightsContainer}>
      <div className={classes.headerContainer}>
        <Typography variant="h4">Flights to {to.cityName}</Typography>
      </div>
      {flights.length &&
        flights.map((flight, index) => (
          <FlightCard key={`flight${index}`} {...flight} />
        ))}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: '8px',
  },
  flightsContainer: {
    marginBottom: '1rem',
  },
  headerContainer: {
    margin: '8px',
  },
}));
