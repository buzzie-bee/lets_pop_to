import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core';

import { NavBar } from './features/navBar/NavBar';
import { Flights } from './features/flights/Flights';
import Footer from './features/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <NavBar />
      <div className={classes.root}>
        <Flights />
        <Footer />
      </div>
    </>
  );
};

export default App;
