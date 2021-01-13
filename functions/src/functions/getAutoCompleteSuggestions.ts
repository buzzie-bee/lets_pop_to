import * as functions from 'firebase-functions';
import axios, { AxiosRequestConfig } from 'axios';
import { cameliseKeys } from '../helpers/cameliseKeys';

import * as cors from 'cors';
const corsHandler = cors({ origin: true });

export const getAutoCompleteSuggestions = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      functions.logger.info('Request for autoCompleteSuggestions');

      if (!request.query.value) {
        response.status(400).json({
          message: 'Not all required fields were sent. Required fields: value',
          query: request.query,
        });
        return;
      }

      const fetchAutoSuggestOptions: AxiosRequestConfig = {
        method: 'GET',
        url:
          'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/',
        params: { query: request.query.value },
        headers: {
          'x-rapidapi-key':
            functions.config().skyscanner?.key ||
            'SKYSCANNER_API_KEY_NOT_FOUND',
          'x-rapidapi-host':
            functions.config().skyscanner?.host || 'SKYSCANNER_HOST_NOT_FOUND',
        },
      };

      try {
        const res = await axios.request(fetchAutoSuggestOptions);
        // TODO: check the response from the api is correct before proceeding. Throw error if not

        // OK
        response.status(200).json(cameliseKeys(res.data));
      } catch (error) {
        functions.logger.error('Fetch AutoComplete Error:', {
          query: request.query,
          error: error,
        });
        // Internal Server Error
        // The server has encountered a situation it doesn't know how to handle.
        response.status(500).json({ query: request.query, error });
      }
      return;
    });
  });
