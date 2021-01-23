import React, { useState } from 'react';
import { Container, Menu, MenuItem, Typography } from '@material-ui/core';
import './Filters.css';

export const Filters = ({
  direct,
  setDirect,
}: {
  direct: boolean;
  setDirect: (direct: boolean) => void;
}) => {
  // const [direct, setDirect] = useState<boolean>(false);
  // const [minPrice, setMinPrice] = useState<number>(0);
  // const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  return (
    <Container>
      <DirectPicker
        handleChange={(direct) => {
          setDirect(direct);
        }}
      />
      {/* <div style={{ height: '300px' }} />
      <div>{`Direct = ${direct}`}</div> */}
      {/* <div>{`Min Price = ${minPrice}`}</div>
      <div>{`Max Price = ${maxPrice}`}</div> */}
    </Container>
  );
};

const DirectPicker = ({
  handleChange,
}: {
  handleChange: (direct: boolean) => void;
}) => {
  const [direct, setDirect] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLSpanElement) | null
  >(null);

  const handleSelect = (direct: boolean) => {
    setDirect(direct);
    handleChange(direct);
    setAnchorEl(null);
  };

  return (
    <div className="filterContainer">
      <Typography variant="h5">
        {direct ? 'My flight must be ' : 'My flight can be '}

        <Typography
          variant="h5"
          className="filterOption"
          aria-controls="direct"
          aria-haspopup="true"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          {direct ? 'Direct Only' : 'Direct or Indirect'}
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
            Direct Only
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleSelect(false);
            }}
          >
            Direct or Indirect
          </MenuItem>
        </Menu>
      </Typography>
    </div>
  );
};
