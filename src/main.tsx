import 'antd/dist/antd.css';
import './app/assets/css/antd.css'

import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './app/store';
import App from './app/app-main'
import { env } from './core/env';

async function checkAndStartMock() {
  if (env.IS_MOCK && env.IS_WEB) {
    const { createWorker } = await import('./core/mock/browser');
    const { handlers } = await import('./modulos/handlers');
    const worker = createWorker(handlers);
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

async function start() {
  await checkAndStartMock();

  const root = ReactDOM.createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

start();