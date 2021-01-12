import axios, { AxiosRequestConfig } from 'axios';

export const fetchPhoto = async (cityName: string) => {
  if (!cityName) {
    return;
  }

  try {
    const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchPlacePhoto?cityName=${cityName}`;

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
    return photoB64;
  } catch (error) {
    console.log(error.message);
    return;
  }
};
