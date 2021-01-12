import * as functions from 'firebase-functions';
import axios, { AxiosRequestConfig } from 'axios';
import { InspireMeQueryType } from '../types';
import { formatInspireDestinationFlights } from '../helpers/formatInspireDestinationFlights';

const cors = require('cors')({ origin: true });

const parseParams = (
  queryParams: any
): InspireMeQueryType | { from: undefined; dates: undefined } => {
  let from = undefined;
  let dates = undefined;
  let error = false;

  const errorOutput = { from: undefined, dates: undefined };

  // Try to parse params
  try {
    if (queryParams.from) {
      // console.log('from exists');
      if (typeof queryParams.from === 'string') {
        // console.log('from is string, parsing');
        from = JSON.parse(queryParams.from);
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
  if (from === undefined || dates === undefined) {
    // console.log('either undefined');
    return errorOutput;
  }

  // check type of values (and if they exist)
  if (typeof from.cityId !== 'string') {
    // console.log('Type of CityId not string');
    error = true;
  }
  if (typeof from.countryId !== 'string') {
    // console.log('Type of CountryId not string');
    error = true;
  }
  if (typeof from.countryName !== 'string') {
    // console.log('Type of CountryName not string');
    error = true;
  }
  if (typeof from.placeId !== 'string') {
    // console.log('Type of PlaceId not string');
    error = true;
  }
  if (typeof from.placeName !== 'string') {
    // console.log('Type of PlaceName not string');
    error = true;
  }
  if (typeof from.regionId !== 'string') {
    // console.log('Type of RegionId not string');
    error = true;
  }

  if (!Array.isArray(dates)) {
    // console.log('dates not array');
    error = true;
  }

  if (dates.length === 0) {
    // console.log('dates empty');
    error = true;
  }

  if (error) {
    // console.log('Error bool true!');
    return errorOutput;
  }

  return {
    from,
    dates,
  };
};

export const fetchInspireDestinations = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    cors(request, response, async () => {
      const queryParams = request.query;

      const { from, dates } = parseParams(queryParams);

      if (from === undefined || dates === undefined) {
        response.status(400).json({ message: 'oops' });
        return;
      }
      const allFlights: any[] = [];

      // dates.forEach(async (date) => {
      for (const date of dates) {
        const country = 'UK';
        const currency = 'GBP';
        const locale = 'en-GB';
        const originPlace = from?.placeId;
        const destinationPlace = 'anywhere';
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
          // TODO: check the response from the api is correct before proceeding. Throw error if not
          const destinationData: any = formatInspireDestinationFlights(
            apiResponse.data
          );
          // // OK
          allFlights.push(destinationData);
        } catch (error) {
          // Internal Server Error
          // The server has encountered a situation it doesn't know how to handle.
          response.status(501).json(error);
        }
      }

      if (allFlights) {
        const allFlightsConsolidated: any = {};
        for (let i = 0; i < allFlights.length; i++) {
          for (const iata in allFlights[i]) {
            if (!allFlightsConsolidated[iata]) {
              allFlightsConsolidated[iata] = allFlights[i][iata];
            } else {
              allFlightsConsolidated[iata].flights?.push(
                ...allFlights[i][iata].flights
              );
            }
          }
        }

        for (const iata in allFlightsConsolidated) {
          allFlightsConsolidated[iata].flights.sort(
            (a: any, b: any) => a.cost.cost - b.cost.cost
          );
        }

        const sortedByPrice = [];

        for (const iata in allFlightsConsolidated) {
          sortedByPrice.push({
            destination: iata,
            cost: allFlightsConsolidated[iata].flights[0].cost.cost,
          });
        }

        sortedByPrice.sort((a: any, b: any) => a.cost - b.cost);

        response.status(200).json({
          sortedByPrice,
          data: allFlightsConsolidated,
        });
        return;
      }
      response.status(501).json({ oops: 'oops' });
      return;
    });
  });
