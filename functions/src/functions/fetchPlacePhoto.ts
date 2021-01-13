import * as functions from 'firebase-functions';
import axios from 'axios';

import * as cors from 'cors';
const corsHandler = cors({ origin: true });

export const fetchPlacePhoto = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      functions.logger.info('Received fetch photo request', request.query);

      if (!request.query.cityName) {
        response.status(400).json({
          message:
            'Not all required fields were sent. Required fields: cityName',
          query: request.query,
        });
        return;
      }

      const { cityName } = request.query;

      try {
        const key = functions.config().googlephotos.key;

        // Fetch photo reference id
        const photoReferenceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${cityName}&inputtype=textquery&key=${key}&fields=name,photos`;
        const photoReferenceResponse: any = await axios.get(photoReferenceUrl);

        const photoReference =
          photoReferenceResponse.data.candidates[0].photos[0][
            'photo_reference'
          ];

        // Fetch photo blob
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoReference}&key=${key}`;
        console.log('fetch photo request');
        // const photoResponse: any = await axios.get(photoUrl, {
        //   responseType: 'blob',
        // });
        // const blob = photoResponse.data;

        const photoResponse: any = await axios.get(photoUrl, {
          responseType: 'arraybuffer',
        });

        const b64Img = Buffer.from(photoResponse.data, 'binary').toString(
          'base64'
        );

        response.status(200).json({ photoReference, b64Img });
        return;
      } catch (error) {
        // Internal Server Error
        // The server has encountered a situation it doesn't know how to handle.
        functions.logger.error('Fetch Photo Error:', {
          query: request.query,
          error: error,
        });
        response.status(500).json({ query: request.query, error });
        return;
      }
    });
  });
