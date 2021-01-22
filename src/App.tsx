import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';

import { NavBar } from './features/navBar/NavBar';

import Footer from './features/footer/Footer';
import InspireMe from './features/inspireMe/InspireMe';
import BrowseInspiredFlights from './features/browseInspiredFlights/BrowseInspiredFlights';

import { ROUTES } from './constants/routes';

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
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <div className={classes.root}>
        <InspireMe />
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <div>Home</div>
          </Route>
          <Route exact path={`${ROUTES.INSPIRATION}/:from/:dates`}>
            <BrowseInspiredFlights />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
