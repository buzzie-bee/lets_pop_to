import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import axios, { AxiosRequestConfig } from 'axios';

interface DestinationCardPropTypes {
  place: any;
  weather: any;
  flights: any;
}

export const DestinationCard = ({
  place,
  weather,
  flights,
}: DestinationCardPropTypes) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [photo, setPhoto] = useState<string>('');

  const fetchPhoto = async () => {
    try {
      const cityName = place.cityName;

      const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchPlacePhoto?cityName=${cityName}`;
      setLoading(true);
      const fetchPhotoOptions: AxiosRequestConfig = {
        method: 'GET',
        url: url,
        headers: {
          'Allow-Control-Allow-Origin': '*',
        },
      };
      // const response = await axios.get(url);
      const response = await axios.request(fetchPhotoOptions);

      const photoB64: any = response.data.b64Img;
      setPhoto(photoB64);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPhoto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
