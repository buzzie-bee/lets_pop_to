import axios, { AxiosRequestConfig } from 'axios';

export const fetchFlights = async ({
  from,
  to,
  dates,
  setLoading,
  setFlights,
}: {
  from: string;
  to: string;
  dates: string[];
  setLoading: (loading: boolean) => void;
  setFlights: (flights: any[]) => void;
}) => {
  try {
    setLoading(true);
    const url = `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchFlights?from=${from}&to=${to}&dates=${JSON.stringify(
      dates
    )}`;
    const fetchFlightsOptions: AxiosRequestConfig = {
      method: 'GET',
      url: url,
      headers: {
        'Allow-Control-Allow-Origin': '*',
      },
    };
    const response = await axios.request(fetchFlightsOptions);
    const flightsResponse: any = response.data;

    if (flightsResponse) {
      setFlights(flightsResponse);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};
