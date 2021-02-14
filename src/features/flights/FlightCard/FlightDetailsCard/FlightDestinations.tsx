import { makeStyles } from '@material-ui/core';
import React from 'react';
import { DestinationDivider } from './DestinationDivider';

export const FlightDestinations = ({
  fromIata,
  fromCityName,
  fromCountryName,
  toIata,
  toCityName,
  toCountryName,
  direct,
}: {
  fromIata: string;
  fromCityName: string;
  fromCountryName: string;
  toIata: string;
  toCityName: string;
  toCountryName: string;
  direct: boolean;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.flightDestinationsContainer}>
      <div className={classes.destinationContainer}>
        <div className={classes.iata}>{fromIata}</div>
        <div className={classes.city}>{fromCityName}</div>
        <div className={classes.country}>{fromCountryName}</div>
      </div>
      <div className={classes.dividerAndDirectContainer}>
        <DestinationDivider stops={direct ? 0 : 1} />
        {direct ? (
          <div className={classes.direct}>Direct</div>
        ) : (
          <div className={classes.stops}>Stops</div>
        )}
      </div>
      <div className={classes.destinationContainer}>
        <div className={classes.iata}>{toIata}</div>
        <div className={classes.city}>{toCityName}</div>
        <div className={classes.country}>{toCountryName}</div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  flightDestinationsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  destinationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minWidth: '125px',
    maxWidth: '200px',
  },
  iata: {
    fontSize: '3.5em',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: '1em',
  },
  city: {
    fontSize: '1.5em',
    fontWeight: 200,
    fontFamily: "Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: '1em',
  },
  country: {
    fontSize: '1em',
    fontFamily: "Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 300,
    lineHeight: '1.5em',
  },
  dividerAndDirectContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  direct: {
    fontFamily: "Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '2.2',
    marginLeft: '-6px',
    color: '#00a640',
  },
  stops: {
    fontFamily: "Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '2.2',
    marginLeft: '-6px',
    color: '#a60000',
  },
}));
