import { Link, Typography } from '@material-ui/core';
import React from 'react';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://letspop.to/">
        LetsPop.to{' '}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
};
