import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ROUTES } from '../../../constants/routes';
import { DateType, FlightType, PlaceDataType } from '../../../type';

export const CardData = ({
  flights,
  place,
  dates,
}: {
  flights: FlightType[];
  place: PlaceDataType;
  dates: DateType[];
}) => {
  const classes = useStyles();

  const renderPrices = () => {
    if (flights.length === 1) {
      if (flights[0].cost.formatted) {
        return `From ${flights[0].cost.formatted}`;
      }
    } else {
      return `From ${flights[0].cost.formatted} to ${
        flights[flights.length - 1].cost.formatted
      }`;
    }
  };

  return (
    <div className={classes.cardDataContainer}>
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => {
            const newTab = window.open(
              `${ROUTES.FLIGHTS_PREFIX}/${JSON.stringify(
                flights[0].outbound.from
              )}/${JSON.stringify(flights[0].outbound.to)}/${JSON.stringify(
                dates
              )}`,
              '_blank'
            );
            newTab?.focus();
          }}
        >
          <CardContent>
            <Typography>{place.name}</Typography>
            <Typography>
              {flights.length} Flights.{' '}
              {
                flights.filter(({ direct }: { direct: boolean }) => direct)
                  .length
              }{' '}
              Direct
            </Typography>

            <Typography>{renderPrices()}</Typography>
            <Typography
              variant="button"
              display="block"
              className={classes.buttonText}
            >
              Tell me more
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cardDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    marginTop: '50px',
    position: 'relative',
    overflow: 'auto',
    height: '90%',
  },
  card: { margin: '10px' },
  buttonText: { textAlign: 'right' },
}));
