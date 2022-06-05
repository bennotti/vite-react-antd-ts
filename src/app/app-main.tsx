import { BrowserRouter } from 'react-router-dom'

import { useEffect } from 'react'

import './assets/css/app.css'
import { AppRoutes } from './app-routes';
import { FullScreenLayout } from '../core/layouts/full-screen.layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLayout } from './selectors/layout.selector';
import { tryRestoreAuth } from '../modulos/autenticacao/thunks/autenticacao.thunk';
import { selectIsRestoringAuth } from '../modulos/autenticacao/selectors/autenticacao.selector';
import { AppDispatch } from './store';
import { LoadingCentered } from '../core/componentes/loading-centered';

const App: React.FC = () => {
  const isLoading = useSelector(selectIsRestoringAuth);
  const currentLayout = useSelector(selectCurrentLayout);

  const dispatch : AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(tryRestoreAuth());
  }, []);

  const renderBrowserContent = () => {
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
    if (isLoading) {
      return (
        <LoadingCentered />
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
