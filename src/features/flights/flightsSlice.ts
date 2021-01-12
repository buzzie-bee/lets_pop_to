import { createSlice } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig } from 'axios';

import { AppDispatch, AppThunk } from '../../redux/store';
import { FlightsType, FetchBrowseFlightsParams } from '../../type';

export const fetchBrowseFlights = ({
  country,
  currency,
  locale,
  originPlace,
  destinationPlace,
  outboundPartialDate,
}: FetchBrowseFlightsParams): AppThunk => {
  return async (dispatch: AppDispatch) => {
    dispatch(getFlights);

    const fetchFlightsOptions: AxiosRequestConfig = {
      method: 'GET',
      url: `https://europe-west1-lets-pop-to-dev.cloudfunctions.net/fetchFlightsCacheQuotes`,
      params: {
        country,
        currency,
        locale,
        originPlace,
        destinationPlace,
        outboundPartialDate,
      },
    };

    // TODO: Remove this console.log
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
  flights: [],
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
      const { flights } = payload;
      state.loaded = true;
      state.loading = false;
      state.error = false;
      state.errorMessage = '';
      state.flights = flights;
    },
  },
});

export const {
  getFlights,
  getFlightsSuccess,
  getFlightsFailure,
} = flightsSlice.actions;

export const flightsReducer = flightsSlice.reducer;
