import React, { useState } from 'react';
import { Menu, MenuItem, Slider, Typography } from '@material-ui/core';
import { PriceRange } from './PriceRange';
import './Filters.css';

interface PricePickerPropType {
  handleChange: (direct: boolean) => void;
  highestPrice: number;
}

export const PricePicker = ({
  handleChange,
  highestPrice,
}: PricePickerPropType) => {
  const [filter, setFilter] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLSpanElement) | null
  >(null);

  const handleSelect = (showFilter: boolean) => {
    setFilter(showFilter);
    // handleChange(direct);
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
          {filter ? 'Important' : 'Unimportant'}
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
      {highestPrice && filter ? (
        <PriceRange highestPrice={highestPrice} />
      ) : (
        <></>
      )}
    </div>
  );
};
