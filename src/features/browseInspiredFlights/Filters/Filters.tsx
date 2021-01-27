import React from 'react';
import { Container } from '@material-ui/core';

import { DirectPicker } from './DirectPicker';
import { PricePicker } from './PricePicker';

export const Filters = () => {
  return (
    <Container>
      <DirectPicker />
      <PricePicker />
    </Container>
  );
};
