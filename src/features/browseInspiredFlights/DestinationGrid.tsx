import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import {
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import useSize from '@react-hook/size';

import { DestinationCard } from './DestinationCard';
import { useDispatch } from 'react-redux';
import { setHighestPrice } from './Filters/filtersSlice';
import { DateType } from '../../type';

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
}));

const DestinationGrid = ({
  from,
  dates,
  directOnly,
  priceRange,
}: {
  from: any;
  dates: DateType[];
  directOnly: boolean;
  priceRange: number[];
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const gridRef = React.useRef(null);
  const [divWidth] = useSize(gridRef);
  const [loading, setLoading] = useState<boolean>(true);
  const [destinations, setDestinations] = useState<any>({});
  const [sortedDestinations, setSortedDestinations] = useState<any[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [imgWidth, setImgWidth] = useState<number>(400);
  const dispatch = useDispatch();

  const sortColumns = (num: number) => {
    const tempColumns = [];

    for (let i = 0; i < num; i++) {
      tempColumns.push(
        filteredDestinations.filter((d, j) => (j + i) % num === 0)
      );
    }
    return tempColumns;
  };

  const calculatedImgWidth = (columns: number): void => {
    const padding = theme.spacing(2) * columns;
    const calculatedImgWidth = Math.floor((divWidth - padding) / columns);
    setImgWidth(calculatedImgWidth);
  };

  useEffect(() => {
    const directFiltered = sortedDestinations.filter(({ destination }) => {
      //@ts-ignore
      return destinations[destination].flights.some(({ direct }) => {
        if (directOnly) {
          return direct === directOnly;
        } else {
          return true;
        }
      });
    });

    const [minPrice, maxPrice] = priceRange;
    const filtered = directFiltered.filter(({ cost }) => {
      return minPrice <= cost && cost <= maxPrice;
    });

    setFilteredDestinations(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedDestinations]);

  useEffect(() => {
    if (filteredDestinations) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divWidth, filteredDestinations]);

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
      const flightsResponse: any = response.data;

      if (flightsResponse.data) {
        setDestinations(flightsResponse.data);
      }
      if (Array.isArray(flightsResponse.sortedByPrice)) {
        // TODO introduce lazy loading/pagination to use slices of prices?
        // setSortedDestinations(flightsResponse.sortedByPrice.slice(0, 50));
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
  };

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, dates]);

  const renderColumn = (columnData: any[]) => {
    if (!loading && destinations && columnData.length && imgWidth) {
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
                <DestinationCard
                  key={destination}
                  {...destinations[destination]}
                  timeoutR={index}
                  width={imgWidth - theme.spacing(2)}
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
                alignItems="flex-start"
                key={`column${i}`}
                spacing={1}
                direction="column"
                style={{
                  display: 'block',
                  width: `${imgWidth + theme.spacing(2)}px`,
                }}
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
          <div className="resultsFoundContainer">
            <Typography variant="h5">{`Found ${
              filteredDestinations.length ? filteredDestinations.length : 0
            } Flights`}</Typography>
          </div>
        ) : (
          ''
        )}

        <Grid
          container
          alignItems="flex-start"
          justify="space-between"
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

export default DestinationGrid;
