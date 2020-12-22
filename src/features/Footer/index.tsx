import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import SkyscannerLogo from '../assets/skyscanner-inline--blue.svg';
import SkyScannerLogo from '../../assets/skyscanner-inline--blue.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://letspop.to/">
        LetsPop.to{' '}
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

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

export default function StickyFooter() {
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
}
