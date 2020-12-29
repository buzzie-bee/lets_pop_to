import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';

import { AppDispatch, AppThunk } from '../../redux/store';
import { FlightsType } from '../../type';
import { cameliseKeys } from '../../helpers/cameliseKeys';

export const fetchFlights = (): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(getFlights);

    const fetchFlightsOptions: AxiosRequestConfig = {
      method: 'GET',
      url:
        'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/UK/GBP/en-GB/MAN-sky/anywhere/anytime',
      // params: { inboundpartialdate: '2019-12-01' },
      headers: {
        'x-rapidapi-key':
          process.env.REACT_APP_SKYSCANNER_X_RAPID_API_KEY ||
          'SKYSCANNER_API_KEY_NOT_FOUND',
        'x-rapidapi-host':
          process.env.REACT_APP_SKYSCANNER_X_RAPID_API_HOST ||
          'SKYSCANNER_HOST_NOT_FOUND',
      },
    };

    console.log(fetchFlightsOptions);
    try {
      const response = await axios.request(fetchFlightsOptions);

      dispatch(getFlightsSuccess(response.data));
    } catch (error) {
      dispatch(getFlightsFailure(error.message));
    }
  };
};

const flightsInitialState: FlightsType = {
  loaded: false,
  loading: false,
  error: false,
  errorMessage: '',
  quotes: null,
  places: null,
  carriers: null,
  currencies: null,
};

export const flightsSlice = createSlice({
  name: 'flights',
  initialState: flightsInitialState,
  reducers: {
    getFlights: (state) => {
      state.loaded = false;
      state.loading = true;
    },
    getFlightsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload;
    },
    getFlightsSuccess: (state, { payload }) => {
      const { quotes, places, carriers, currencies } = cameliseKeys(payload);
      state.loaded = true;
      state.loading = false;
      state.error = false;
      state.errorMessage = '';
      state.quotes = quotes;
      state.places = places;
      state.carriers = carriers;
      state.currencies = currencies;
    },
  },
});

export const {
  getFlights,
  getFlightsSuccess,
  getFlightsFailure,
} = flightsSlice.actions;

export const flightsReducer = flightsSlice.reducer;
