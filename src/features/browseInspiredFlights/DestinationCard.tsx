import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { fetchPhoto } from './fetchPhoto';

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
    const cityName = place.cityName;

    setLoading(true);

    const getPhoto = async (cityName: string) => {
      await timeout(timeoutR);
      const photoB64 = await fetchPhoto(cityName);
      if (isSubscribed) {
        if (photoB64) {
          setPhoto(photoB64);
          setLoading(false);
        }
      }
    };

    getPhoto(cityName);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    setTimeout((isSubscribed = true) => {
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
        />
      );
    }
  };

  return (
    <>
      <Paper>
        <Typography>Flight</Typography>
        loading: {JSON.stringify(loading)}
        {renderImage()}
      </Paper>
      <div>
        <pre>{JSON.stringify(place)}</pre>
        <pre>{JSON.stringify(weather)}</pre>
        <pre>{JSON.stringify(flights)}</pre>
      </div>
    </>
  );
};
