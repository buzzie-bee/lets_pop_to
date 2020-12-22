import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { NavBar } from './features/navBar/NavBar';
import { Flights } from './features/flights/Flights';

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Flights />
    </>
  );
};

export default App;
