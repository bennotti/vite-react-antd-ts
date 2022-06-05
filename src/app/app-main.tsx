import { BrowserRouter } from 'react-router-dom'

import { Spin } from 'antd';

import { useEffect, useState } from 'react'

import './assets/css/app.css'
import { AppRoutes } from './app-routes';
import { FullScreenLayout } from '../core/layouts/full-screen.layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLayout } from './selectors/layout.selector';
import { tryRestoreAuth } from '../modulos/autenticacao/thunks/autenticacao.thunk';
import { selectIsRestoringAuth } from '../modulos/autenticacao/selectors/autenticacao.selector';
import { AppDispatch } from './store';

const App: React.FC = () => {
  const isRestoring = useSelector(selectIsRestoringAuth);
  const currentLayout = useSelector(selectCurrentLayout);

  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(tryRestoreAuth());
  }, []);

  const renderBrowserContent = () => {
    console.log(currentLayout);
    if (currentLayout === 'application') {
      return (
        <FullScreenLayout>
          <AppRoutes />
        </FullScreenLayout>
      );
    }
    return <AppRoutes />;
  }
  const renderContent = () => {
    if (isRestoring) {
      return (
        <div className={'centered'}>
          <Spin />
        </div>
      );
    }
    return <BrowserRouter>{renderBrowserContent()}</BrowserRouter>;
  };
  return (
    <div className='App'>
      {renderContent()}
    </div>
  )
}

export default App
