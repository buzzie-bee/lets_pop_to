import React, { useCallback, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import useSize from '@react-hook/size';
import { Waypoint } from 'react-waypoint';

import { DestinationCard } from './DestinationCard/DestinationCard';
import { useDispatch } from 'react-redux';
import { setHighestPrice } from './Filters/filtersSlice';
import {
  DateType,
  FlightDestinationsType,
  PlaceOptionType,
  SortedByPriceDestinationType,
} from '../../type';

type ColumnWidthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const DestinationGrid = ({
  from,
  dates,
  directOnly,
  priceRange,
}: {
  from: PlaceOptionType;
  dates: DateType[];
  directOnly: boolean;
  priceRange: number[];
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [destinations, setDestinations] = useState<FlightDestinationsType>({});
  const [sortedDestinations, setSortedDestinations] = useState<
    SortedByPriceDestinationType[]
  >([]);
  const [filteredDestinations, setFilteredDestinations] = useState<
    SortedByPriceDestinationType[]
  >([]);
  const [columns, setColumns] = useState<SortedByPriceDestinationType[][]>([]);
  const [columnWidth, setColumnWidth] = useState<ColumnWidthType>(12);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();
  const classes = useStyles();
  const gridRef = React.useRef(null);
  const [divWidth] = useSize(gridRef);

  const sortColumns = useCallback(
    (num: number) => {
      const tempColumns = [];

      for (let i = 0; i < num; i++) {
        tempColumns.push(
          filteredDestinations
            .slice(0, page * 20)
            .filter((d, j) => (j + i) % num === 0)
        );
      }
      return tempColumns;
    },
    [filteredDestinations, page]
  );

  useEffect(() => {
    const directFiltered = sortedDestinations.filter(({ destination }) => {
      if (destinations[destination]) {
        if (destinations[destination].flights) {
          //@ts-ignore - need to create interfaces now data is shaped how I need it to be
          return destinations[destination].flights.some(({ direct }) => {
            if (directOnly) {
              return direct === directOnly;
            } else {
              return true;
            }
          });
        }
      }
      return false;
    });

    const [minPrice, maxPrice] = priceRange;
    const filtered = directFiltered.filter(({ cost }) => {
      return minPrice <= cost && cost <= maxPrice;
    });

    setFilteredDestinations(filtered);
  }, [destinations, directOnly, priceRange, sortedDestinations]);

  useEffect(() => {
    if (filteredDestinations) {
      type NumCols = 1 | 2 | 3 | 4;
      let numberOfColumns: NumCols = 1;

      if (divWidth <= 600) {
        numberOfColumns = 1;
      } else if (divWidth <= 1200) {
        numberOfColumns = 2;
      } else if (divWidth <= 1600) {
        numberOfColumns = 3;
      } else {
        numberOfColumns = 4;
      }

      const colWidth = (12 / numberOfColumns) as ColumnWidthType;
      setColumnWidth(colWidth);

      const sortedColumns = sortColumns(numberOfColumns);
      setColumns(sortedColumns);
    }
  }, [divWidth, filteredDestinations, sortColumns, page]);

  const fetchFlights = useCallback(async () => {
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
      const flightsResponse: any = response.data;

      if (flightsResponse.data) {
        setDestinations(flightsResponse.data);
      }
      if (Array.isArray(flightsResponse.sortedByPrice)) {
        setSortedDestinations(flightsResponse.sortedByPrice);
        if (flightsResponse.sortedByPrice.length) {
          const highestPrice =
            flightsResponse.sortedByPrice[
              flightsResponse.sortedByPrice.length - 1
            ].cost;
          dispatch(setHighestPrice(highestPrice));
        }
      }
      setLoading(false);
    } catch (error) {
      // TODO: Error handling here
      console.log(error.message);
    }
  }, [dates, dispatch, from]);

  useEffect(() => {
    fetchFlights();
  }, [from, dates, fetchFlights]);

  const incrementPage = () => {
    if (filteredDestinations.length > page * 20) {
      setPage((page) => page + 1);
    }
  };

  const renderColumn = (columnData: SortedByPriceDestinationType[]) => {
    if (!loading && destinations && columnData.length) {
      return (
        <>
          {columnData.map(({ destination }, index) => {
            return (
              <Grid
                key={`grid for ${destination} ${index}`}
                item
                className={classes.columnItem}
                sm={12}
              >
                {index === columnData.length - 5 && (
                  <Waypoint onEnter={() => incrementPage()} />
                )}
                <DestinationCard
                  key={destination}
                  {...destinations[destination]}
                  dates={dates}
                />
              </Grid>
            );
          })}
        </>
      );
    }

    // TODO: Better 'no flights found' component
    // return <div>No flights</div>;
    return <></>;
  };

  const renderMasonry = () => {
    if (loading) {
      // if (true) {
      return (
        <Grid item className={classes.loadingGridItem}>
          <div className={classes.loadingDiv}>
            <LinearProgress className={classes.linearProgress} />
            <Typography>Loading</Typography>
          </div>
        </Grid>
      );
    } else {
      return (
        <>
          {columns.map((columnData, i) => {
            return (
              <Grid
                container
                item
                alignItems="flex-start"
                key={`column${i}`}
                spacing={1}
                direction="column"
                xs={columnWidth}
                className={classes.columnStyle}
              >
                {renderColumn(columnData)}
              </Grid>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <Paper className={classes.paperStyle}>
        {!loading ? (
          <div className={classes.resultsFoundContainer}>
            <Typography variant="h5">{`We found ${
              filteredDestinations.length ? filteredDestinations.length : 0
            } options for you:`}</Typography>
          </div>
        ) : (
          ''
        )}

        <Grid
          container
          alignItems="flex-start"
          justify="space-evenly"
          direction="row"
          spacing={1}
          ref={gridRef}
        >
          {renderMasonry()}
        </Grid>
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  columnItem: { display: 'block' },
  loadingGridItem: { width: '100%', minHeight: '25%' },
  loadingDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    minHeight: '25%',
  },
  linearProgress: { width: '100%', marginBottom: '1em', marginTop: '2em' },
  paperStyle: {
    padding: '2%',
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '73vh',
  },
  columnStyle: {
    display: 'block',
  },
  resultsFoundContainer: {
    paddingTop: '8px',
    paddingBottom: '16px',
  },
}));
