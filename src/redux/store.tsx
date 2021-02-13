import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { inspireMeReducer } from '../features/inspireMe/slice/inspireMeSlice';
import { filtersReducer } from '../features/browseInspiredFlights/Filters/filtersSlice';

const rootReducer = combineReducers({
  inspireMe: inspireMeReducer,
  filters: filtersReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ['persist/PERSIST'] },
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
