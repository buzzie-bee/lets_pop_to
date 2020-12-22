import { configureStore } from '@reduxjs/toolkit';
import { flightsReducer } from '../features/flights/flightsSlice';

export default configureStore({
  reducer: {
    flights: flightsReducer,
  },
});
