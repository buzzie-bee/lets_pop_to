import { createSlice } from '@reduxjs/toolkit';
import { InspireMeStateType } from '../../type';

const inspireMeInitialState: InspireMeStateType = {
  from: null,
  dates: [],
  newDates: [],
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
    setNewDates: (state, { payload }) => {
      state.newDates = payload;
    },
  },
});

export const { setFrom, setDates, setNewDates } = inspireMeSlice.actions;

export const inspireMeReducer = inspireMeSlice.reducer;
