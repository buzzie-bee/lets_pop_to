import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { PriceRange } from './PriceRange';

import { RootState } from '../../../redux/store';
import { setShowPriceFilter } from './filtersSlice';

export const PricePicker = () => {
  const dispatch = useDispatch();
  const { showPriceFilter, highestPrice } = useSelector(
    (state: RootState) => state.filters
  );

  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLSpanElement) | null
  >(null);

  const classes = useStyles();

  const handleSelect = (showFilter: boolean) => {
    dispatch(setShowPriceFilter(showFilter));
    setAnchorEl(null);
  };

  return (
    <div className={classes.filterContainer}>
      <Typography variant="h5" className={classes.filterTitle}>
        {'Price is '}
      </Typography>
      <Typography
        variant="h5"
        className={classes.filterOption}
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

      {highestPrice && showPriceFilter ? <PriceRange /> : <></>}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    marginTop: '4px',
    padding: '4px',
    display: 'block',
  },
  filterTitle: {
    display: 'inline',
  },
  filterOption: {
    boxShadow: '0 2px 0 #9933cc',
    display: 'inline',
    '&:hover': {
      boxShadow: 'none',
      cursor: 'pointer',
    },
  },
}));
