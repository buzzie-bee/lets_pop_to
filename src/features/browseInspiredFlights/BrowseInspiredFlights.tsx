import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import { Container, Typography } from '@material-ui/core';

import { RootState } from '../../redux/store';
import { InspireMeStateType } from '../../type';
import { DestinationCard } from './DestinationCard';

const BrowseInspiredFlights: React.FC = () => {
  const { from, dates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [destinations, setDestinations] = useState<any>({});
  const [sortedDestinations, setSortedDestinations] = useState<any[]>([]);

  const fetchFlights = async () => {
    try {
      // setLoading(true);
      const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchInspireDestinations?from=${JSON.stringify(
        from
      )}&dates=${JSON.stringify(dates)}`;
      setLoading(true);
      const fetchInspiredFlightsOptions: AxiosRequestConfig = {
        method: 'GET',
        url: url,
        headers: {
          'Allow-Control-Allow-Origin': '*',
        },
      };
      // const response = await axios.get(url);
      const response = await axios.request(fetchInspiredFlightsOptions);
      console.log(response);
      const flightsResponse: any = response.data;

      if (flightsResponse.data) {
        setDestinations(flightsResponse.data);
      }
      if (Array.isArray(flightsResponse.sortedByPrice)) {
        setSortedDestinations(flightsResponse.sortedByPrice);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFlights = () => {
    if (!loading && destinations && sortedDestinations.length) {
      return (
        <>
          {sortedDestinations.map(({ destination, cost }, index) => {
            if (index < 100) {
              return (
                <DestinationCard
                  key={destination}
                  {...destinations[destination]}
                  timeoutR={index}
                />
              );
            }
          })}
        </>
      );
    }

    return <div>No flights</div>;
  };

  return (
    <Container>
      <Typography variant="h4">Browse inspired flights</Typography>
      {loading && <div>Loading</div>}
      <Container>{renderFlights()}</Container>
    </Container>
  );
};

export default BrowseInspiredFlights;
