import React from 'react';
import { DestinationDivider } from './DestinationDivider';
import './FlightDestinations.css';

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
  return (
    <div className="flightDestinationsContainer">
      <div className="destinationContainer">
        <div className="iata">{fromIata}</div>
        <div className="city">{fromCityName}</div>
        <div className="country">{fromCountryName}</div>
      </div>
      <div className="dividerAndDirectContainer">
        <DestinationDivider stops={direct ? 0 : 1} />
        {direct ? (
          <div className="direct">Direct</div>
        ) : (
          <div className="stops">Stops</div>
        )}
      </div>
      <div className="destinationContainer">
        <div className="iata">{toIata}</div>
        <div className="city">{toCityName}</div>
        <div className="country">{toCountryName}</div>
      </div>
    </div>
  );
};
