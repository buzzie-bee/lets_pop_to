import axios, { AxiosRequestConfig } from 'axios';

export const fetchPhoto = async ({ location }: { location: string }) => {
  if (!location) {
    return;
  }

  try {
    const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchPlacePhoto?location=${location}`;

    const fetchPhotosOptions: AxiosRequestConfig = {
      method: 'GET',
      url: url,
      headers: {
        'Allow-Control-Allow-Origin': '*',
      },
    };

    const response = await axios.request(fetchPhotosOptions);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};
