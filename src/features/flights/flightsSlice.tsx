import { createSlice } from '@reduxjs/toolkit';
import { FlightsType } from '../../type';
import { sampleFlights } from './sampleFlights';

import { cameliseKeys } from '../../helpers/cameliseKeys';

const flightsInitialState: FlightsType = {
  quotes: null,
  places: null,
  carriers: null,
  currencies: null,
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState: flightsInitialState,
  reducers: {
    getFlights: (state: FlightsType) => {
      const { quotes, places, carriers, currencies } = cameliseKeys(
        sampleFlights
      );
      return {
        quotes,
        places,
        carriers,
        currencies,
      };
    },
  },
});

export const { getFlights } = flightsSlice.actions;

export const flightsReducer = flightsSlice.reducer;
