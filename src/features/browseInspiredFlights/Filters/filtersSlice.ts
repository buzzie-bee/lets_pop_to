import { createSlice } from '@reduxjs/toolkit';

export interface FiltersStateType {
  direct: boolean;
  showPriceFilter: boolean;
  priceRange: number[];
  highestPrice: number;
}

const filtersInitialState: FiltersStateType = {
  direct: false,
  showPriceFilter: false,
  priceRange: [0, 1000000],
  highestPrice: 0,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setDirectFilter: (state, { payload }) => {
      state.direct = payload;
    },
    setShowPriceFilter: (state, { payload }) => {
      state.showPriceFilter = payload;
    },
    setPriceRange: (state, { payload }) => {
      state.priceRange = payload;
    },
    setHighestPrice: (state, { payload }) => {
      state.highestPrice = payload;
    },
    initialiseFilters: (state) => {
      state.showPriceFilter = false;
      state.priceRange = [0, 1000000];
      state.highestPrice = 0;
    },
  },
});

export const {
  setDirectFilter,
  setShowPriceFilter,
  setPriceRange,
  setHighestPrice,
  initialiseFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
