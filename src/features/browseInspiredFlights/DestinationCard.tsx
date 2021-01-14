import React, { useEffect, useState } from 'react';
// import { Container, Paper, Typography } from '@material-ui/core';
// ts-ignore
import { remove as removeDiacritics } from 'diacritics';
import { fetchPhoto } from './fetchPhoto';
import { Skeleton } from '@material-ui/lab';

interface DestinationCardPropTypes {
  place: any;
  weather: any;
  flights: any;
  timeoutR: number;
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
      const photoB64 = await fetchPhoto(cityQuery);
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
          style={{ borderRadius: '8px' }}
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
              top: 5,
              right: 5,
              border: '2px',
              backgroundColor: '#FFFFFF',
              padding: '4px',
              borderRadius: '4px',
            }}
          >
            Hello
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
            <button>Press Me</button>
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
        <pre>{JSON.stringify(place)}</pre>
        <pre>{JSON.stringify(weather)}</pre>
        <pre>{JSON.stringify(flights)}</pre>
      </div> */}
    </>
  );
};
