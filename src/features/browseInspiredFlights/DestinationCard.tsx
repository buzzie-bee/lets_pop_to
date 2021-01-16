import React, { useEffect, useState } from 'react';
// import { Container, Paper, Typography } from '@material-ui/core';
// ts-ignore
import { remove as removeDiacritics } from 'diacritics';
import { fetchPhoto } from './fetchPhoto';
import { Skeleton } from '@material-ui/lab';
import { Box, Button, Typography } from '@material-ui/core';

interface DestinationCardPropTypes {
  place: any;
  weather: any;
  flights: any;
  timeoutR: number;
  width?: number;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [photo, setPhoto] = useState<string>('');

  useEffect(() => {
    const isSubscribed = true;
    const cityQuery = removeDiacritics(
      `${place.cityName} ${place.countryName}`
    );

    setLoading(true);

    const getPhoto = async (cityQuery: string) => {
      await timeout(timeoutR);
      const photoB64 = await fetchPhoto({ cityName: cityQuery, width });
      if (isSubscribed) {
        if (photoB64) {
          setPhoto(photoB64);
          setLoading(false);
        }
      }
    };

    getPhoto(cityQuery);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    setTimeout(() => {
      if (isSubscribed) {
        setLoading(false);
      }
    }, 1000);

    // prettier-ignore
    return () => {isSubscribed = false}
  }, []);

  const renderImage = () => {
    if (photo) {
      return (
        <img
          alt={`${place.cityName}`}
          src={`data:image/jpeg;base64,${photo}`}
          style={{ borderRadius: '8px', objectFit: 'cover' }}
        />
      );
    } else {
      return (
        <Skeleton variant="rect" width={400} height={400} animation="wave" />
      );
    }
  };

  const renderCard = () => {
    if (photo) {
      return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {renderImage()}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              padding: '8px',
              borderRadius: '4px',
            }}
          >
            <Typography style={{ textAlign: 'right', lineHeight: '110%' }}>
              <span style={{ fontSize: '1.3em' }}>
                {place.cityName}
                <br />
              </span>
              <span style={{ fontWeight: 200, fontSize: '0.8em' }}>
                from:
                <br />
              </span>
              <span style={{ fontStyle: 'bold', fontSize: '1.1em' }}>
                {flights[0].cost.formatted}
              </span>
            </Typography>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              width: '100%',
              alignContent: 'end',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Button>More</Button>
          </div>
        </div>
      );
    }

    return renderImage();
  };

  return (
    <>
      {renderCard()}

      {/* <div>
        <pre>{JSON.stringify(place, null, 2)}</pre>
        <pre>{JSON.stringify(weather, null, 2)}</pre>
        <pre>{JSON.stringify(flights, null, 2)}</pre>
      </div> */}
    </>
  );
};
