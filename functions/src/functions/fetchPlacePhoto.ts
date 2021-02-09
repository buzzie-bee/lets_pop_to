import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import axios from 'axios';
import * as cors from 'cors';
import * as firebaseCredentials from '../firebaseCredentials.json';

const corsHandler = cors({ origin: true });

const parseParams = (
  queryParams: any
): { location: string } | { location: undefined } => {
  let location = undefined;
  let error = false;

  const errorOutput = { location: '' };

  // Try to parse params
  try {
    if (queryParams.location) {
      console.log('location exists');
      if (typeof queryParams.location === 'string') {
        console.log('location is string, parsing');
        location = queryParams.location;
      }
    }
  } catch (error) {
    console.log(error);
    return errorOutput;
  }

  // Check params included
  if (location === undefined) {
    console.log('location undefined');
    return errorOutput;
  }

  // check type of values (and if they exist)
  if (typeof location !== 'string') {
    console.log('Type of location not string');
    error = true;
  }

  if (error) {
    console.log('Error bool true!');
    return errorOutput;
  }

  return {
    location,
  };
};

// INITIALISE FIREBASE
let db: FirebaseFirestore.Firestore;
try {
  const firebase = admin.initializeApp({
    // @ts-ignore - TODO manually implement type checking of firebaseCredentials.json
    credential: admin.credential.cert(firebaseCredentials),
  });
  db = firebase.firestore();
} catch (error) {
  functions.logger.error('Initialise Firebase Error:', {
    error,
  });
}

const placeholder = (location: string): any => {
  const iata = location ? location : 'undefined';
  const data = {
    iata: iata,
    query: 'Unrecognised Iata. Entry is not in images database',
    images: [
      {
        url_l:
          'https://via.placeholder.com/506/FF0000/808080?Text=ImgNotYetEntered',
        flickrUrl: 'https://www.flickr.com',
        title: 'Unrecognised IATA',
        owner: 'Unknown IATA',
      },
    ],
    skyCode: 'Unrecognised',
    occurances: 0,
    imgUrl:
      'https://via.placeholder.com/506/FF0000/808080?Text=ImgNotYetEntered',
  };
  return data;
};

export const fetchPlacePhoto = functions
  .region('europe-west1')
  .https.onRequest(async (request, response) => {
    corsHandler(request, response, async () => {
      functions.logger.info('Received fetch photo request', request.query);

      const queryParams = request.query;
      const { location } = parseParams(queryParams);

      if (!location) {
        response.status(400).json({
          message:
            'All params not included. Required params are location: string;',
        });
        return;
      }

      const testDoc = await db.collection('images').doc(location).get();
      if (testDoc.exists) {
        const data = testDoc.data();
        response.status(200).json({
          location,
          data,
        });
      }

      try {
        response.status(200).json(placeholder(location));
        return;
      } catch (error) {
        functions.logger.error('Fetch Photo Error:', {
          query: request.query,
          error: error,
        });
        response.status(500).json({ query: request.query, error });
        return;
      }
    });
  });
