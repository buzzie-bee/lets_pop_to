import * as functions from 'firebase-functions';
import axios, { AxiosRequestConfig } from 'axios';

// import * as cors from 'cors';

import { formatFlightData } from './helpers/formatFlightData';
import { FlightsType } from './types';
import { checkFieldsBrowseQuotes } from './helpers/checkFieldsBrowseQuotes';

const cors = require('cors')({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const fetchFlightsCacheQuotes = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    cors(request, response, async () => {
      functions.logger.info('Received browse quotes request', request.query);

      if (!checkFieldsBrowseQuotes(request.query)) {
        response.status(400).json({
          message:
            'Not all required fields were sent. Required fields: country, currency, locale, originPlace, destinationPlace, outboundPartialDate',
          query: request.query,
        });
        return;
      }

      const {
        country,
        currency,
        locale,
        originPlace,
        destinationPlace,
        outboundPartialDate,
        // inboundPartialDate,
      } = request.query;

      const fetchFlightsOptions: AxiosRequestConfig = {
        method: 'GET',
        url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${country}/${currency}/${locale}/${originPlace}/${destinationPlace}/${outboundPartialDate}`,
        // params: { inboundpartialdate: '2019-12-01' },
        headers: {
          'x-rapidapi-key':
            functions.config().skyscanner?.key ||
            'SKYSCANNER_API_KEY_NOT_FOUND',
          'x-rapidapi-host':
            functions.config().skyscanner?.host || 'SKYSCANNER_HOST_NOT_FOUND',
        },
      };

      try {
        const res = await axios.request(fetchFlightsOptions);
        // TODO: check the response from the api is correct before proceeding. Throw error if not
        const flights: FlightsType = await formatFlightData(res.data);
        // OK
        response.status(200).json(flights);
      } catch (error) {
        // Internal Server Error
        // The server has encountered a situation it doesn't know how to handle.
        response.status(500).json(error);
      }
      return;
    });
  });
