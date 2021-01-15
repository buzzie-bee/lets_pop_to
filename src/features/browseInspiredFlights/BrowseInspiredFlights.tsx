import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import useSize from '@react-hook/size';

import { RootState } from '../../redux/store';
import { InspireMeStateType } from '../../type';
import { DestinationCard } from './DestinationCard';

const BrowseInspiredFlights: React.FC = () => {
  const { from, dates }: InspireMeStateType = useSelector(
    (state: RootState) => state.inspireMe
  );

  const theme = useTheme();
  // const xs = useMediaQuery(theme.breakpoints.up('xs'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  // const xl = useMediaQuery(theme.breakpoints.up('xl'));

  const gridRef = React.useRef(null);
  const [width] = useSize(gridRef);

  useEffect(() => {
    console.log(width);
  }, [width]);

  const [loading, setLoading] = useState<boolean>(true);
  const [destinations, setDestinations] = useState<any>({});
  const [sortedDestinations, setSortedDestinations] = useState<any[]>([]);

  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    if (sortedDestinations) {
      if (lg) {
        const tempColumns = [];

        tempColumns.push(sortedDestinations.filter((d, i) => i % 2 === 0));
        tempColumns.push(
          sortedDestinations.filter((d, i) => (i + 1) % 2 === 0)
        );
        setColumns(tempColumns);
      } else if (md) {
        const tempColumns = [];

        tempColumns.push(sortedDestinations.filter((d, i) => i % 2 === 0));
        tempColumns.push(
          sortedDestinations.filter((d, i) => (i + 1) % 2 === 0)
        );

        setColumns(tempColumns);
      } else {
        setColumns([sortedDestinations]);
      }
    }
  }, [sm, md, lg, sortedDestinations]);

  useEffect(() => {
    console.log(columns);
  }, [columns]);

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

  // const renderFlights = () => {
  //   if (!loading && destinations && sortedDestinations.length) {
  //     return (
  //       <>
  //         {sortedDestinations.map(({ destination, cost }, index) => {
  //           if (index < 100) {
  //             return (
  //               // <Grid item>
  //               <DestinationCard
  //                 key={destination}
  //                 {...destinations[destination]}
  //                 timeoutR={index}
  //               />
  //               // </Grid>
  //             );
  //           }
  //         })}
  //       </>
  //     );
  //   }

  //   return <div>No flights</div>;
  // };
  const renderColumn = (columnData: any[]) => {
    if (!loading && destinations && columnData.length) {
      return (
        <>
          {columnData.map(({ destination, cost }, index) => {
            if (index < 100) {
              return (
                <Grid item style={{ display: 'block' }} sm={12}>
                  <DestinationCard
                    key={destination}
                    {...destinations[destination]}
                    timeoutR={index}
                  />
                </Grid>
              );
            }
          })}
        </>
      );
    }

    return <div>No flights</div>;
  };

  // const renderGrids = () => {
  //   if (true) {
  //   }
  // };

  return (
    <Container>
      <Typography variant="h4">Browse inspired flights</Typography>
      {loading && <div>Loading</div>}
      <Grid container alignItems="baseline" direction="row" ref={gridRef}>
        {columns.map((columnData, i) => {
          return (
            <Grid
              container
              className={`Grid: ${i}`}
              spacing={1}
              style={{ display: 'block', maxWidth: '420px' }}
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
