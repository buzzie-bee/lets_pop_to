import { createSlice } from '@reduxjs/toolkit';
import { InspireMeStateType } from '../../type';

const inspireMeInitialState: InspireMeStateType = {
  from: null,
  dates: [],
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
  },
});

export const { setFrom, setDates } = inspireMeSlice.actions;

export const inspireMeReducer = inspireMeSlice.reducer;
