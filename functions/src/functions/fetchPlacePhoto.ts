import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
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
      // console.log('location exists');
      if (typeof queryParams.location === 'string') {
        // console.log('location is string, parsing');
        location = queryParams.location;
      }
    }
  } catch (error) {
    // console.log(error);
    return errorOutput;
  }

  // Check params included
  if (location === undefined) {
    // console.log('location undefined');
    return errorOutput;
  }

  // check type of values (and if they exist)
  if (typeof location !== 'string') {
    // console.log('Type of location not string');
    error = true;
  }

  if (error) {
    // console.log('Error bool true!');
    return errorOutput;
  }

  return {
    location,
  };
};

interface ImageResponseType {
  url: string;
  owner: string;
  title: string;
  flickrUrl: string;
}

const checkImageData = (imageData: any | undefined): true | false => {
  // Check exists
  if (!imageData) {
    return false;
  }

  if (!imageData) {
    // console.log('no data');
    return false;
  }

  const data = imageData;

  if (!data.images) {
    // console.log('no images');
    return false;
  }

  if (!Array.isArray(data.images)) {
    // console.log('images not array');
    return false;
  }

  if (!data.images.length) {
    // console.log('no images in array');
    return false;
  }

  const img = data.images[0];

  if (!img) {
    // console.log('no first image');
    return false;
  }

  if (!(img.url_l || img.url_m)) {
    // console.log('url NOR check failed');
    return false;
  }

  if (!(typeof img.url_l === 'string' || typeof img.url_m === 'string')) {
    // console.log('url string NOR failed');
    return false;
  }

  if (!img.flickrUrl) {
    // console.log('no flickr url');
    return false;
  }

  if (typeof img.flickrUrl !== 'string') {
    // console.log('flickrUrl not string');
    return false;
  }

  if (!img.owner) {
    // console.log('no owner');
    return false;
  }

  if (typeof img.owner !== 'string') {
    // console.log('owner not string');
    return false;
  }

  // Not checking if exists as some images don't have titles
  if (typeof img.title !== 'string') {
    // console.log('title not string');
    return false;
  }

  // Passed all tests
  // console.log('passed all tests');
  return true;
};

const parseImageData = (
  imageData: any | undefined
): ImageResponseType | false => {
  if (!checkImageData(imageData)) {
    return false;
  }

  const img = imageData.images[0];
  const url = img.url_l ? img.url_l : img.url_m;
  const owner = img.ownername;
  const title = img.title;
  const flickrUrl = img.flickrUrl;

  const retVal = {
    url,
    owner,
    title,
    flickrUrl,
  };

  return retVal;
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
  const placeholderResponse = {
    url: 'https://via.placeholder.com/500x300?text=Img+Not+Yet+Entered',
    owner: `Image Not Found in DB for ${iata}`,
    title: `Image Not Found in DB for ${iata}`,
    flickrUrl: `Image Not Found in DB for ${iata}`,
  };
  return placeholderResponse;
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

      let output = placeholder(location);

      try {
        const testDoc = await db.collection('images').doc(location).get();
        if (testDoc.exists) {
          const data = testDoc.data();
          const parsed = parseImageData(data);
          if (parsed) {
            const { url, flickrUrl, owner, title } = parsed;
            output = {
              url,
              flickrUrl,
              owner,
              title,
            };
          }
        }
      } catch (error) {
        functions.logger.error('Fetch Photo Error:', {
          query: request.query,
          error: error,
          message: 'Reading from firestore and parsing error',
        });
        response.status(501).json({
          query: request.query,
          error,
          message: 'failure in reading and parsing from db',
        });
        return;
      }

      try {
        response.status(200).json(output);
        return;
      } catch (error) {
        functions.logger.error('Fetch Photo Error:', {
          query: request.query,
          error: error,
          message: 'Error returning response data',
        });
        response.status(501).json({ query: request.query, error });
        return;
      }
    });
  });
