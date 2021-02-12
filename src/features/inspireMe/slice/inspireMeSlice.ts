import { createSlice } from '@reduxjs/toolkit';
import { inspireMeInitialState } from './initialState';

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
    setWeekdaySelections: (state, { payload }) => {
      state.weekdaySelections = payload;
    },
    setDurationRange: (state, { payload }) => {
      state.durationRange = payload;
    },
    setMonths: (state, { payload }) => {
      state.months = payload;
    },
  },
});

export const {
  setFrom,
  setDates,
  setSelectorType,
  setWeekdaySelections,
  setDurationRange,
  setMonths,
} = inspireMeSlice.actions;

export const inspireMeReducer = inspireMeSlice.reducer;
