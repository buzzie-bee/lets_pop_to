import * as functions from 'firebase-functions';
import * as cors from 'cors';
import { FetchFlightsQueryType } from '../types';
import axios, { AxiosRequestConfig } from 'axios';
import { formatFlightData } from '../helpers/formatFlightData';

const parseParams = (
  queryParams: any
):
  | FetchFlightsQueryType
  | { from: undefined; to: undefined; dates: undefined } => {
  let from = undefined;
  let to = undefined;
  let dates = undefined;
  let error = false;
  const errorOutput = { from: undefined, to: undefined, dates: undefined };

  // Try to parse params
  try {
    if (queryParams.from) {
      // console.log('from exists');
      if (typeof queryParams.from === 'string') {
        // console.log('from is string, parsing');
        from = queryParams.from;
      }
    }
    if (queryParams.to) {
      // console.log('from exists');
      if (typeof queryParams.from === 'string') {
        // console.log('from is string, parsing');
        to = queryParams.to;
      }
    }
    if (queryParams.dates) {
      // console.log('dates exists');
      if (typeof queryParams.dates === 'string') {
        // console.log('dates is a string');
        dates = JSON.parse(queryParams.dates);
      }
    }
  } catch (error) {
    // console.log(error);
    return errorOutput;
  }

  // Check params included
  if (from === undefined || to === undefined || dates === undefined) {
    console.log(
      'Failed to parse param in parseParams. One field was undefined'
    );
    return errorOutput;
  }

  if (!Array.isArray(dates)) {
    console.log('dates not array');
    error = true;
  }

  if (dates.length === 0) {
    console.log('dates empty');
    error = true;
  }

  if (error) {
    console.log('Error bool true!');
    return errorOutput;
  }

  return {
    from,
    to,
    dates,
  };
};

const corsHandler = cors({ origin: true });

export const fetchFlights = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      const queryParams = request.query;

      const { from, to, dates } = parseParams(queryParams);

      if (from === undefined || to === undefined || dates === undefined) {
        functions.logger.error('Fetch Quotes Error:', {
          query: request.query,
          error: 'Query params failed check',
        });
        response.status(400).json({ message: 'oops', query: request.query });
        return;
      }

      const allFlights: any[] = [];

      try {
        for (const date of dates) {
          const country = 'UK';
          const currency = 'GBP';
          const locale = 'en-GB';
          const originPlace = `${from}-iata`;
          const destinationPlace = `${to}-iata`;
          const outboundPartialDate = date;

          const fetchFlightsOptions: AxiosRequestConfig = {
            method: 'GET',
            url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}`,
            // params: { inboundpartialdate: '2019-12-01' },
            headers: {
              'x-rapidapi-key':
                functions.config().skyscanner?.key ||
                'SKYSCANNER_API_KEY_NOT_FOUND',
              'x-rapidapi-host':
                functions.config().skyscanner?.host ||
                'SKYSCANNER_HOST_NOT_FOUND',
            },
          };

          try {
            const apiResponse = await axios.request(fetchFlightsOptions);

            const flightData: any = formatFlightData(apiResponse.data);
            if (flightData) {
              allFlights.push(...flightData.flights);
            }
          } catch (error) {
            functions.logger.error('Fetch Quotes Skyscanner API Error:', {
              query: request.query,
              error: error,
            });
            response.status(501).json({ query: request.query, error });
            return;
          }
        }
        response.status(200).json(allFlights);
        return;
      } catch (error) {
        const errorMessage = 'Fetch Quotes Looping Dates Error:';
        functions.logger.error(errorMessage, {
          query: request.query,
          error: error,
        });
        response.status(501).json({
          errorMessage: errorMessage,
          query: request.query,
          error: error,
        });
        return;
      }
    });
  });
