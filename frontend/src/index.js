import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AuthorizationProvider } from './AuthorizationContext';
import i18n from './i18n';
import initializationsSocket, { SocketContext } from './socket';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const socket = initializationsSocket();
filter.add(filter.getDictionary('ru'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <SocketContext.Provider value={socket}>
            <AuthorizationProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AuthorizationProvider>
          </SocketContext.Provider>
        </Provider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>,
);
