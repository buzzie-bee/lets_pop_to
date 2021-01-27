import React, { useState } from 'react';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { PriceRange } from './PriceRange';
import './Filters.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setShowPriceFilter } from './filtersSlice';

export const PricePicker = () => {
  // const [filter, setFilter] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { showPriceFilter, highestPrice } = useSelector(
    (state: RootState) => state.filters
  );

  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLSpanElement) | null
  >(null);

  const handleSelect = (showFilter: boolean) => {
    // setFilter(showFilter);
    dispatch(setShowPriceFilter(showFilter));
    setAnchorEl(null);
  };

  return (
    <div className="filterContainer">
      <Typography variant="h5">
        {'Price is '}
        <Typography
          variant="h5"
          className="filterOption"
          aria-controls="direct"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {showPriceFilter ? 'Important' : 'Unimportant'}
        </Typography>

        <Menu
          id="direct"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => {
            setAnchorEl(null);
          }}
        >
          <MenuItem
            onClick={() => {
              handleSelect(true);
            }}
          >
            Important
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSelect(false);
            }}
          >
            Unimportant
          </MenuItem>
        </Menu>
      </Typography>
      {highestPrice && showPriceFilter ? <PriceRange /> : <></>}
    </div>
  );
};
