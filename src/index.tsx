import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import App from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
