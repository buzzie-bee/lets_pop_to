import { makeStyles } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface CarouselImageType {
  alt: string;
  src: string;
}

export const CalendarCarousel = () => {
  const classes = useStyles();

  const images: CarouselImageType[] = [
    {
      alt: 'normal calendar example',
      src:
        'https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FnormalCalendar.png?alt=media&token=034bdaa8-8c16-4102-8a6a-a40fc697d215',
    },
    {
      alt: 'advanced calendar example outbound',
      src:
        'https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FadvancedOutbound.png?alt=media&token=5fda163f-b28d-4fb9-862a-d70f768ff504',
    },
    {
      alt: 'advanced calendar example return',
      src:
        'https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FadvancedReturn.png?alt=media&token=3b4b84e0-16af-44ae-8d95-a9578f48b461',
    },
    {
      alt: 'weekday calendar outbound day selector',
      src:
        'https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FweekdaysReturn.png?alt=media&token=e23bd8e8-c14d-45c7-921b-f35f0fd4fa2c',
    },
    {
      alt: 'weekday calendar return day selector',
      src:
        'https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FweekdayOutbound.png?alt=media&token=58f739cc-de1b-4160-adb6-3678f39e079f',
    },
    {
      alt: 'weekday selector choose months',
      src:
        'https://firebasestorage.googleapis.com/v0/b/lets-pop-to-dev.appspot.com/o/static%2FweekdaysMonths.png?alt=media&token=3106796d-c661-4095-bebf-878bfdefe774',
    },
  ];
  return (
    <Carousel
      interval={3000}
      indicators={false}
      swipe={false}
      navButtonsAlwaysInvisible={true}
      stopAutoPlayOnHover={false}
    >
      {images.map(({ src, alt }: CarouselImageType) => {
        return <img alt={alt} src={src} className={classes.carouselImage} />;
      })}
    </Carousel>
  );
};

const useStyles = makeStyles((theme) => ({
  carouselImage: {
    maxHeight: '500px',
    maxWidth: '300px',
    objectFit: 'cover',
    borderRadius: '16px',
  },
}));
