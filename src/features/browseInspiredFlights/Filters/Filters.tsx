import React from 'react';
import { Container } from '@material-ui/core';

import { DirectPicker } from './DirectPicker';
import { PricePicker } from './PricePicker';

interface FilterPropType {
  setDirect: (direct: boolean) => void;
  setPriceRange: (range: number[]) => void;
  highestPrice: number;
}

export const Filters = ({ setDirect, highestPrice }: FilterPropType) => {
  return (
    <Container>
      <DirectPicker
        handleChange={(direct) => {
          setDirect(direct);
        }}
      />
      <PricePicker
        handleChange={(direct) => console.log(direct)}
        highestPrice={highestPrice}
      />
    </Container>
  );
};
