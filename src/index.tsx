import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './store/stateProvider';
import { StatisticsProvider } from './statistics/statisticsProvider';
import { BackendProvider } from './backend/backendProvider';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <BackendProvider>
        <StatisticsProvider>
          <App />
        </StatisticsProvider>
      </BackendProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
