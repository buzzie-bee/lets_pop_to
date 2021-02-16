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
import { Home } from './static/Home/Home';

export const App: React.FC = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <div className={classes.root}>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Home />
          </Route>
          <Route exact path={`${ROUTES.ABOUT}`}>
            <About />
          </Route>
          <Route exact path={`${ROUTES.INSPIRATION}`}>
            <InspireMe floating={false} />
            <BrowseInspiredFlights />
          </Route>
          <Route exact path={`${ROUTES.FLIGHTS}`}>
            <InspireMe floating={false} />
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
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
}));
