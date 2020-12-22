import { createSlice } from '@reduxjs/toolkit';
import { sampleFlights } from './sampleFlights';

export const flightsSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: {},
  },
  reducers: {
    getFlights: (state) => {
      state.flights = sampleFlights;
    },
  },
});

export const { getFlights } = flightsSlice.actions;

export const flightsReducer = flightsSlice.reducer;
