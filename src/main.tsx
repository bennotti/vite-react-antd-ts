import 'antd/dist/antd.css';
import './app/assets/css/antd.css'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './app/store';
import App from './app/app-main'
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
