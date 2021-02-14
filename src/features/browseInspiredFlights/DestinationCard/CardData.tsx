import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { ROUTES } from '../../../constants/routes';
import { DateType } from '../../../type';

export const CardData = ({
  flights,
  place,
  dates,
}: {
  flights: any;
  place: any;
  dates: DateType[];
}) => {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        marginTop: '50px',
        position: 'relative',
        overflow: 'auto',
        height: '90%',
      }}
    >
      <Card style={{ margin: '10px' }}>
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
              style={{ textAlign: 'right' }}
            >
              Tell me more
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
