import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { setDirectFilter } from './filtersSlice';

export const DirectPicker = () => {
  const dispatch = useDispatch();
  const [direct, setDirect] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & HTMLSpanElement) | null
  >(null);

  const classes = useStyles();

  const handleSelect = (direct: boolean) => {
    setDirect(direct);
    dispatch(setDirectFilter(direct));
    setAnchorEl(null);
  };

  return (
    <div className={classes.filterContainer}>
      <Typography variant="h5" className={classes.filterTitle}>
        {direct ? 'My flight must be ' : 'My flight can be '}
      </Typography>
      <Typography
        variant="h5"
        className={classes.filterOption}
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
