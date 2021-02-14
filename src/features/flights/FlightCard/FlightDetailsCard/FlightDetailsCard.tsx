import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { CarrierType, FromType, ToType } from '../../../../type';
import { FlightDestinations } from './FlightDestinations';
import { Logo } from './Logo';

export const FlightDetailsCard = ({
  from,
  to,
  carrier,
  departing,
  direct,
  direction,
}: {
  from: FromType;
  to: ToType;
  carrier: CarrierType;
  departing: string;
  direct: boolean;
  direction: 'Outbound' | 'Return';
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.detailsPaper}>
      <div className={classes.directionAndDateContainer}>
        <Typography variant="button">{direction}</Typography>
        <div className={classes.date}>{departing.slice(0, 10)}</div>
      </div>

      <Grid
        container
        item
        direction="row"
        justify="space-around"
        alignItems="flex-start"
      >
        <Grid item>
          <Logo airlineName={carrier.name} />
          <Typography className={classes.carrier}>{carrier.name}</Typography>
        </Grid>
        <Grid item>
          <FlightDestinations
            fromIata={from.iataCode}
            fromCityName={from.cityName}
            fromCountryName={from.countryName}
            toIata={to.iataCode}
            toCityName={to.cityName}
            toCountryName={to.countryName}
            direct={direct}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  detailsPaper: {
    padding: '4px',
    marginRight: '8px',
    marginTop: '8px',
    marginBottom: '8px',
  },
  directionAndDateContainer: {
    display: 'inline',
  },
  date: {
    display: 'inline',
    marginLeft: '8px',
  },
  carrier: {
    marginTop: '-8px',
    fontWeight: 'lighter',
  },
}));
