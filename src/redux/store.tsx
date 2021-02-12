import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { inspireMeReducer } from '../features/inspireMe/slice/inspireMeSlice';
import { filtersReducer } from '../features/browseInspiredFlights/Filters/filtersSlice';

const rootReducer = combineReducers({
  inspireMe: inspireMeReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
