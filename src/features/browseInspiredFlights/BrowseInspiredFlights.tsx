import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import { Container, Grid, Typography, useTheme } from '@material-ui/core';
import useSize from '@react-hook/size';

import { RootState } from '../../redux/store';
import { InspireMeStateType } from '../../type';
import { DestinationCard } from './DestinationCard';

const BrowseInspiredFlights: React.FC = () => {
  const { from, dates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );
  const theme = useTheme();
  const gridRef = React.useRef(null);
  const [divWidth] = useSize(gridRef);
  const [loading, setLoading] = useState<boolean>(true);
  const [destinations, setDestinations] = useState<any>({});
  const [sortedDestinations, setSortedDestinations] = useState<any[]>([]);

  const [columns, setColumns] = useState<any[]>([]);
  const [imgWidth, setImgWidth] = useState<number>(400);

  const sortColumns = (num: number) => {
    const tempColumns = [];

    for (let i = 0; i < num; i++) {
      tempColumns.push(
        sortedDestinations.filter((d, j) => (j + i) % num === 0)
      );
    }
    console.log(tempColumns);
    return tempColumns;
  };

  const calculatedImgWidth = (columns: number): void => {
    const padding = theme.spacing(2) * columns;
    const calculatedImgWidth = Math.floor((divWidth - padding) / columns);
    setImgWidth(calculatedImgWidth);
  };

  useEffect(() => {
    if (sortedDestinations) {
      let numberOfColumns = 1;

      if (divWidth <= 600) {
        numberOfColumns = 1;
      } else if (divWidth <= 1200) {
        numberOfColumns = 2;
      } else if (divWidth <= 1600) {
        numberOfColumns = 3;
      } else {
        numberOfColumns = 4;
      }

      const sortedColumns = sortColumns(numberOfColumns);
      calculatedImgWidth(numberOfColumns);
      setColumns(sortedColumns);
      console.log(sortedColumns);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divWidth, sortedDestinations]);

  const fetchFlights = async () => {
    try {
      setLoading(true);

      const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchInspireDestinations?from=${JSON.stringify(
        from
      )}&dates=${JSON.stringify(dates)}`;

      const fetchInspiredFlightsOptions: AxiosRequestConfig = {
        method: 'GET',
        url: url,
        headers: {
          'Allow-Control-Allow-Origin': '*',
        },
      };
      const response = await axios.request(fetchInspiredFlightsOptions);
      console.log(response);
      const flightsResponse: any = response.data;

      if (flightsResponse.data) {
        setDestinations(flightsResponse.data);
      }
      if (Array.isArray(flightsResponse.sortedByPrice)) {
        setSortedDestinations(flightsResponse.sortedByPrice.slice(0, 50));
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      // TODO: Error handling here
    }
  };

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderColumn = (columnData: any[]) => {
    if (!loading && destinations && columnData.length && imgWidth) {
      return (
        <>
          {columnData.map(({ destination }, index) => {
            return (
              <Grid item style={{ display: 'block' }} sm={12}>
                <DestinationCard
                  key={destination}
                  {...destinations[destination]}
                  timeoutR={index}
                  width={imgWidth - theme.spacing(2)}
                />
              </Grid>
            );
          })}
        </>
      );
    }

    // TODO: Better 'no flights found' component
    return <div>No flights</div>;
  };

  useEffect(() => {
    console.log(divWidth);
    console.log(imgWidth);
    console.log(columns.length * (imgWidth + theme.spacing(2)));
  }, [divWidth]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Browse inspired flights</Typography>
      {/* TODO: Implement better loading indicator */}
      {loading && <div>Loading</div>}
      <Grid
        container
        alignItems="flex-start"
        justify="space-between"
        direction="row"
        spacing={1}
        ref={gridRef}
      >
        {columns.map((columnData, i) => {
          return (
            <Grid
              container
              alignItems="flex-start"
              spacing={1}
              style={{
                display: 'block',
                width: `${imgWidth + theme.spacing(2)}px`,
              }}
              direction="column"
            >
              {renderColumn(columnData)}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default BrowseInspiredFlights;
