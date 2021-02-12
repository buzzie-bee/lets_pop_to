import { createSlice } from '@reduxjs/toolkit';
import { InspireMeStateType } from '../../type';

const inspireMeInitialState: InspireMeStateType = {
  from: null,
  dates: [],
  selectorType: 'Normal',
};

export const inspireMeSlice = createSlice({
  name: 'inspireMe',
  initialState: inspireMeInitialState,
  reducers: {
    setFrom: (state, { payload }) => {
      state.from = payload;
    },
    setDates: (state, { payload }) => {
      state.dates = payload;
    },
    setSelectorType: (state, { payload }) => {
      state.selectorType = payload;
      state.dates = [];
    },
  },
});

export const { setFrom, setDates, setSelectorType } = inspireMeSlice.actions;

export const inspireMeReducer = inspireMeSlice.reducer;
