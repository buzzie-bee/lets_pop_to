import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, makeStyles } from '@material-ui/core';

import { NavBar } from './features/navBar/NavBar';

import { Footer } from './features/footer/Footer';
import { InspireMe } from './features/inspireMe/InspireMe';
import { BrowseInspiredFlights } from './features/browseInspiredFlights/BrowseInspiredFlights';
import { Flights } from './features/flights/Flights';
import { About } from './static/About';

import { ROUTES } from './constants/routes';

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
          <Route exact path={`${ROUTES.ABOUT}`}>
            <About />
          </Route>
          <Route exact path={`${ROUTES.INSPIRATION}`}>
            <BrowseInspiredFlights />
          </Route>
          <Route exact path={`${ROUTES.FLIGHTS}`}>
            <Flights />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));
