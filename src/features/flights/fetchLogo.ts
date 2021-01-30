import axios, { AxiosRequestConfig } from 'axios';

export const fetchLogo = async ({
  airlineName,
  setLoading,
  setLogoUrl,
}: {
  airlineName: string;
  setLoading: (loading: boolean) => void;
  setLogoUrl: (logoUrl: string) => void;
}) => {
  try {
    setLoading(true);
    const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchAirlineLogo?airlineName=${airlineName}`;
    const fetchAirlineLogoOptions: AxiosRequestConfig = {
      method: 'GET',
      url: url,
      headers: {
        'Allow-Control-Allow-Origin': '*',
      },
    };
    const response = await axios.request(fetchAirlineLogoOptions);
    const logoResponse: any = response.data;

    if (logoResponse.imgUrl) {
      setLogoUrl(logoResponse.imgUrl);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
