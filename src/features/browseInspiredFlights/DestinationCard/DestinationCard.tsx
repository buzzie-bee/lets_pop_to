import React, { useEffect, useState } from 'react';
import { Fab, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// ts-ignore TODO - create typefile
import { remove as removeDiacritics } from 'diacritics';
import { DateType } from '../../../type';

import { CardData } from './CardData';
import { fetchPhoto } from '../fetchPhoto';
import './DestinationCardStyles.css';

// TODO add in types now data structure is settled
interface DestinationCardPropTypes {
  place: any;
  weather: any;
  flights: any;
  dates: DateType[];
}

export const DestinationCard = ({
  place,
  flights,
  dates,
}: DestinationCardPropTypes) => {
  const [photo, setPhoto] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

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
        }
      }
    };

    getPhoto(cityQuery);

    return () => {
      isSubscribed = false;
      return;
    };
  }, [place]);

  const renderImage = () => {
    if (photo) {
      return (
        <img
          key={photo}
          alt={`${place.cityName}`}
          src={photo}
          className="cardImage"
        />
      );
    } else {
      return <Skeleton variant="rect" height={400} animation="wave" />;
    }
  };

  if (!photo) {
    return <Skeleton variant="rect" height={400} animation="wave" />;
  }
  return (
    <div className="cardContainer">
      {renderImage()}
      <div className="cardDetailsContainer">
        <Typography style={{ textAlign: 'right', lineHeight: '110%' }}>
          <span className="cardDetailsCityName">
            {place.cityName}
            <br />
          </span>
          <span className="cardDetailsFrom">
            from:
            <br />
          </span>
          <span className="cardDetailsCost">{flights[0].cost.formatted}</span>
          <br />
          {flights.some(({ direct }: { direct: boolean }) => direct) ? (
            <span style={{ color: 'green' }}>direct</span>
          ) : (
            ''
          )}
        </Typography>
      </div>
      <div className={`cardOverlay ${showOverlay ? 'active' : 'inactive'}`}>
        <div className="cardButtonContainer">
          <Fab
            color="default"
            size="small"
            aria-label="up"
            className="cardOverlayFAB"
            onClick={() => {
              setShowOverlay(!showOverlay);
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
        <div className="cardOverlayContent">
          <Typography variant="h4">Flights</Typography>
          <CardData flights={flights} place={place} dates={dates} />
        </div>
      </div>
    </div>
  );
};
