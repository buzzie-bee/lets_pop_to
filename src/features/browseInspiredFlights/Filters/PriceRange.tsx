import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { PriceSlider } from './PriceSlider';

interface PriceRangePropType {
  highestPrice: number;
}

export const PriceRange = ({ highestPrice }: PriceRangePropType) => {
  const [value, setValue] = useState<number[]>([0, highestPrice]);
  const [showSlider, setShowSlider] = useState<boolean>(true);

  if (showSlider) {
    return (
      <PriceSlider
        value={value}
        setValue={setValue}
        highestPrice={highestPrice}
        setShowSlider={setShowSlider}
      />
    );
  } else {
    return (
      <div className="filterContainer">
        <Typography variant="h5">
          {'Show me flights between '}
          <Typography
            variant="h5"
            className="filterOption"
            aria-controls="direct"
            aria-haspopup="true"
            onClick={() => setShowSlider(true)}
          >
            {value[0]}
          </Typography>
          {' and '}
          <Typography
            variant="h5"
            className="filterOption"
            aria-controls="direct"
            aria-haspopup="true"
            onClick={() => setShowSlider(true)}
          >
            {value[1]}
          </Typography>
        </Typography>
      </div>
    );
  }
};
