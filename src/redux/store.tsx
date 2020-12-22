import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { flightsReducer } from '../features/flights/flightsSlice';

const rootReducer = combineReducers({
  flights: flightsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
