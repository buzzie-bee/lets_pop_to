import React, { useEffect, useState } from 'react';
import { Box, Fab, makeStyles, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// ts-ignore TODO - create typefile
import { remove as removeDiacritics } from 'diacritics';
import {
  DateType,
  FlightType,
  PlaceDataType,
  WeatherType,
} from '../../../type';

import { CardData } from './CardData';
import { fetchPhoto } from '../fetchPhoto';

interface DestinationCardPropTypes {
  place: PlaceDataType;
  weather: WeatherType;
  flights: FlightType[];
  dates: DateType[];
}

export const DestinationCard = ({
  place,
  flights,
  dates,
}: DestinationCardPropTypes) => {
  const [photo, setPhoto] = useState<string>('');
  const [imgOwner, setImgOwner] = useState<string>('');
  const [imgTitle, setImgTitle] = useState<string>('');
  const [imgFlickrUrl, setImgFlickrUrl] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    let isSubscribed = true;

    if (!place) {
      return;
    }
    const { cityName, countryName } = place;
    if (!cityName || !countryName) {
      return;
    }

    const cityQuery = removeDiacritics(`${cityName} ${countryName}`);

    const getPhoto = async (cityQuery: string) => {
      const imgData = await fetchPhoto({ location: cityQuery });
      if (isSubscribed) {
        if (imgData) {
          setPhoto(imgData.url);
          console.log(imgData.title.substring(0, 10));
          if (imgData.title.substring(0, 9) === 'Image Not') {
            return;
          }
          if (imgData.owner) {
            setImgOwner(imgData.owner);
          }
          if (imgData.title) {
            setImgTitle(imgData.title);
          }
          if (imgData.flickrUrl) {
            setImgFlickrUrl(imgData.flickrUrl);
          }
        }
      }
    };

    getPhoto(cityQuery);

    return () => {
      isSubscribed = false;
      return;
    };
  }, [place]);

  if (!photo) {
    return <Skeleton variant="rect" height={400} animation="wave" />;
  }
  return (
    <div className={classes.cardContainer}>
      <img
        key={photo}
        alt={`${place.cityName}`}
        src={photo}
        className={classes.cardImage}
      />
      <div className={classes.cardDetailsContainer}>
        <Typography className={classes.cardDetailsTypography}>
          <span className={classes.cardDetailsCityName}>
            {place.cityName}
            <br />
          </span>
          <span className={classes.cardDetailsFrom}>
            from:
            <br />
          </span>
          <span className={classes.cardDetailsCost}>
            {flights[0].cost.formatted}
          </span>
          <br />
          {flights.some(({ direct }: { direct: boolean }) => direct) ? (
            <span className={classes.directSpan}>direct</span>
          ) : (
            ''
          )}
        </Typography>
      </div>
      <Box
        className={`${classes.cardOverlay} ${
          showOverlay ? 'cardOverlayActive' : ''
        }`}
      >
        <div className={classes.cardButtonContainer}>
          <Fab
            color="default"
            size="small"
            aria-label="up"
            className={classes.cardOverlayFAB}
            onClick={() => {
              setShowOverlay(!showOverlay);
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
        <div className={classes.cardOverlayContent}>
          <Typography variant="h4">Flights</Typography>
          <CardData flights={flights} place={place} dates={dates} />
          {imgFlickrUrl && (
            <Paper className={classes.photoCredit}>
              <Typography variant="caption">
                {`'${imgTitle ? imgTitle : 'Photo'}' ${
                  imgOwner ? `by ${imgOwner}` : ''
                } - `}
                {imgFlickrUrl && (
                  <a href={imgFlickrUrl} target="blank">
                    find them on Flickr
                  </a>
                )}
              </Typography>
            </Paper>
          )}
        </div>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    transition: 'width 0.3s, height 0.3s, transform 0.3s',
    '&:hover $cardOverlay': {
      height: '100%',
      background: 'rgba(255, 255, 255, 0.75)',
    },
    '&:hover $cardOverlayFAB': {
      transform: 'rotate(-180deg)',
    },
    '&:hover $cardOverlayContent': {
      display: 'block',
    },
  },
  cardImage: {
    borderRadius: '8px',
    width: '100%',
    minHeight: '290px',
    objectFit: 'cover',
  },
  cardDetailsContainer: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#ffffff',
    padding: '8px',
    borderRadius: '4px',
  },
  cardDetailsTypography: {
    textAlign: 'right',
    lineHeight: '110%',
  },
  cardDetailsCityName: {
    fontSize: '1.3em',
  },
  cardDetailsFrom: {
    fontWeight: 200,
    fontSize: '0.8em',
  },
  cardDetailsCost: {
    fontStyle: 'bold',
    fontSize: '1.1em',
  },
  directSpan: {
    color: 'green',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    width: '100%',
    height: '55px',
    transition: '0.5s ease',
    '&.cardOverlayActive': {
      height: '100%',
      background: 'rgba(255, 255, 255, 0.75)',
    },
    '&.cardOverlayActive $cardOverlayFAB': {
      transition: '0.5s',
      transform: 'rotate(-180deg)',
    },
    '&.cardOverlayActive $cardOverlayContent': {
      display: 'block',
    },
  },
  cardOverlayFAB: {
    transition: 'transform 0.5s',
  },
  cardButtonContainer: {
    position: 'absolute',
    top: '5px',
    width: '100%',
    alignContent: 'start',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardOverlayContent: {
    display: 'none',
  },
  photoCredit: {
    marginLeft: '14px',
    marginRight: '14px',
    marginTop: '4px',
    padding: '4px',
  },
}));
