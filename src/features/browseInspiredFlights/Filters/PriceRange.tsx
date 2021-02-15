import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { PriceSlider } from './PriceSlider';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export const PriceRange = () => {
  const [showSlider, setShowSlider] = useState<boolean>(true);
  const { priceRange, highestPrice } = useSelector(
    (state: RootState) => state.filters
  );

  const classes = useStyles();

  if (showSlider) {
    return <PriceSlider setShowSlider={setShowSlider} />;
  } else {
    const [minPrice, maxPrice] = priceRange;
    return (
      <div className={classes.filterContainer}>
        <Typography variant="h5">
          {'My budget is from '}
          <Typography
            variant="h5"
            className={classes.filterOption}
            aria-controls="direct"
            aria-haspopup="true"
            onClick={() => setShowSlider(true)}
          >
            {`£${minPrice}`}
          </Typography>
          {' to '}
          <Typography
            variant="h5"
            className={classes.filterOption}
            aria-controls="direct"
            aria-haspopup="true"
            onClick={() => setShowSlider(true)}
          >
            {maxPrice === highestPrice ? 'the moon 🚀' : `£${maxPrice}`}
          </Typography>
        </Typography>
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    marginTop: '4px',
    padding: '4px',
    display: 'block',
  },
  filterOption: {
    boxShadow: '0 2px 0 #9933cc',
    display: 'inline',
    '&:hover': {
      boxShadow: 'none',
      cursor: 'pointer',
    },
  },
}));
