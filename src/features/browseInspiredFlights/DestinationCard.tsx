import React, { useEffect, useState } from 'react';
// ts-ignore TODO - create typefile
import { remove as removeDiacritics } from 'diacritics';
import { fetchPhoto } from './fetchPhoto';
import { Skeleton } from '@material-ui/lab';
import {
  Card,
  CardActionArea,
  CardContent,
  Fab,
  Typography,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './DestinationCardStyles.css';
import { ROUTES } from '../../constants/routes';
import { DateType } from '../../type';

// TODO add in types once data structure is settled
interface DestinationCardPropTypes {
  place: any;
  weather: any;
  flights: any;
  timeoutR: number;
  width: number;
  dates: DateType[];
}

const timeout = (ms: number): Promise<void> => {
  const delay = ms * 100;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const DestinationCard = ({
  place,
  flights,
  timeoutR,
  dates,
}: DestinationCardPropTypes) => {
  const [photo, setPhoto] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;
    //TODO validate cityName and countryName are present
    const cityQuery = removeDiacritics(
      `${place.cityName} ${place.countryName}`
    );

    const getPhoto = async (cityQuery: string) => {
      await timeout(timeoutR);
      const imgData = await fetchPhoto({ location: cityQuery });
      if (isSubscribed) {
        if (imgData) {
          setPhoto(imgData.url);
        }
      }
    };
    getPhoto(cityQuery);

    return () => {
      isSubscribed = false;
      return;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderImage = () => {
    if (photo) {
      return (
        <img
          key={photo}
          alt={`${place.cityName}`}
          src={photo}
          className="cardImage"
        />
      );
    } else {
      return <Skeleton variant="rect" height={400} animation="wave" />;
    }
  };

  const renderCard = () => {
    if (photo) {
      return (
        <div className="cardContainer">
          {renderImage()}
          <div className="cardDetailsContainer">
            <Typography style={{ textAlign: 'right', lineHeight: '110%' }}>
              <span className="cardDetailsCityName">
                {place.cityName}
                <br />
              </span>
              <span className="cardDetailsFrom">
                from:
                <br />
              </span>
              <span className="cardDetailsCost">
                {flights[0].cost.formatted}
              </span>
              <br />
              {flights.some(({ direct }: { direct: boolean }) => direct) ? (
                <span style={{ color: 'green' }}>direct</span>
              ) : (
                ''
              )}
            </Typography>
          </div>
          <div className={`cardOverlay ${showOverlay ? 'active' : 'inactive'}`}>
            {/* <div className={'cardOverlay active'}> */}
            <div className="cardButtonContainer">
              <Fab
                color="default"
                size="small"
                aria-label="up"
                className="cardOverlayFAB"
                onClick={() => {
                  setShowOverlay(!showOverlay);
                }}
              >
                <KeyboardArrowUpIcon />
              </Fab>
            </div>
            <div className="cardOverlayContent">
              <Typography variant="h4">Flights</Typography>
              <CardData flights={flights} place={place} dates={dates} />
            </div>
          </div>
        </div>
      );
    }

    return renderImage();
  };

  return <>{renderCard()}</>;
};

const CardData = ({
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
            console.log('clicked');
            const newTab = window.open(
              `${ROUTES.FLIGHTS_PREFIX}/${JSON.stringify(
                flights[0].from
              )}/${JSON.stringify(flights[0].to)}/${JSON.stringify(dates)}`,
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
