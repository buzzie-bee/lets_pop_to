import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Copyright } from '@material-ui/icons';
import SkyScannerLogo from '../../assets/skyscanner-inline--blue.svg';

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Footer Goes Here</Typography>

        <a href="https://www.skyscanner.net">
          <img src={SkyScannerLogo} alt={'Powered by skyscanner'} />
        </a>
        <Copyright />
      </Container>
    </footer>
  );
};

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));
