import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { AuthorizationProvider } from './AuthorizationContext';
import i18n from './i18n';

const rollbarConfig = {
  accessToken: '65b8d0332b9643d59048b6bc6349b1a4',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <AuthorizationProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthorizationProvider>
        </Provider>
      </I18nextProvider>
    </ErrorBoundary>
  </RollbarProvider>,
);
