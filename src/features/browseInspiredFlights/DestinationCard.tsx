import React, { useEffect, useState } from 'react';
// ts-ignore
import { remove as removeDiacritics } from 'diacritics';
import { fetchPhoto } from './fetchPhoto';
import { Skeleton } from '@material-ui/lab';
import {
  Button,
  ClickAwayListener,
  Fab,
  IconButton,
  Typography,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './DestinationCardStyles.css';

interface DestinationCardPropTypes {
  place: any;
  weather: any;
  flights: any;
  timeoutR: number;
  width: number;
}

const timeout = (ms: number): Promise<void> => {
  const delay = ms * 100;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const DestinationCard = ({
  place,
  weather,
  flights,
  timeoutR,
  width,
}: DestinationCardPropTypes) => {
  const [photo, setPhoto] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  useEffect(() => {
    let isSubscribed = true;
    const cityQuery = removeDiacritics(
      `${place.cityName} ${place.countryName}`
    );

    const getPhoto = async (cityQuery: string) => {
      await timeout(timeoutR);
      const photoB64 = await fetchPhoto({ cityName: cityQuery, width });
      if (isSubscribed) {
        if (photoB64) {
          setPhoto(photoB64);
        }
      }
    };

    getPhoto(cityQuery);
    // prettier-ignore
    return () =>{isSubscribed = false};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderImage = () => {
    if (photo) {
      return (
        <img
          alt={`${place.cityName}`}
          src={`data:image/jpeg;base64,${photo}`}
          style={{
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
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
            </Typography>
          </div>
          <div className="cardButtonContainer">
            <Fab
              color="default"
              size="small"
              aria-label="up"
              onClick={() => {
                setShowOverlay(true);
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </div>

          <div className={`cardOverlay ${showOverlay ? 'show' : ''}`}>
            <h1>Test</h1>
            <button>Push me</button>
          </div>
        </div>
      );
    }

    return renderImage();
  };

  return <>{renderCard()}</>;
};
