import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { PriceSlider } from './PriceSlider';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export const PriceRange = () => {
  const [showSlider, setShowSlider] = useState<boolean>(true);
  const { priceRange, highestPrice } = useSelector(
    (state: RootState) => state.filters
  );

  if (showSlider) {
    return <PriceSlider setShowSlider={setShowSlider} />;
  } else {
    const [minPrice, maxPrice] = priceRange;
    return (
      <div className="filterContainer">
        <Typography variant="h5">
          {'My budget is from '}
          <Typography
            variant="h5"
            className="filterOption"
            aria-controls="direct"
            aria-haspopup="true"
            onClick={() => setShowSlider(true)}
          >
            {minPrice}
          </Typography>
          {' to '}
          <Typography
            variant="h5"
            className="filterOption"
            aria-controls="direct"
            aria-haspopup="true"
            onClick={() => setShowSlider(true)}
          >
            {maxPrice === highestPrice ? 'the moon 🚀' : maxPrice}
          </Typography>
        </Typography>
      </div>
    );
  }
};
