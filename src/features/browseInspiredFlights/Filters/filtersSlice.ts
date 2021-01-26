import { createSlice } from '@reduxjs/toolkit';

interface filtersStateType {
  direct: boolean;
  priceRange: number[];
  highestPrice: number;
}

const filtersInitialState: filtersStateType = {
  direct: false,
  priceRange: [0, 1000000],
  highestPrice: 0,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setDirect: (state, { payload }) => {
      state.direct = payload;
    },
    setPriceRange: (state, { payload }) => {
      state.priceRange = payload;
    },
    setHighestPrice: (state, { payload }) => {
      state.highestPrice = payload;
    },
  },
});

export const {
  setDirect,
  setPriceRange,
  setHighestPrice,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
