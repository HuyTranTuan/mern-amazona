import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'
import { StoreProvider } from './Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <BrowserRouter>
          <PayPalScriptProvider deferLoading={true}>
            <App/>
          </PayPalScriptProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
