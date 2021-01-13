import axios from 'axios';

export const fetchPhoto = async (cityName: string) => {
  if (!cityName) {
    return;
  }

  try {
    const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchPlacePhoto?cityName=${cityName}`;
    const response = await axios.get(url);
    const photoB64: any = response.data.b64Img;
    return photoB64;
  } catch (error) {
    console.log(error.message);
    return;
  }
};
