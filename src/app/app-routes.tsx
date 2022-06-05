import { FC, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const ErrorScreen = React.lazy(() => import('../core/telas/error.screen'));
const NotFoundRouteScreen = React.lazy(() => import('../core/telas/not-found-route.screen'));

import PublicRoutes from '../core/componentes/routes/public.routes';
import ProtectedRoutes from '../core/componentes/routes/protected.routes';
import { LoginScreen } from '../modulos/autenticacao/telas/login.screen';
import { DashboardScreen } from '../modulos/dashboard/telas/dashboard.screen';
import { DashboardTextScreen } from '../modulos/dashboard/telas/dashboard-text.screen';
import React from 'react';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Suspense fallback={<div>Carregando...</div>}>
        <Route path='login' element={<PublicRoutes/>}>
          <Route path='/login' element={<LoginScreen/>}/>
        </Route>
        <Route path='/' element={<ProtectedRoutes/>}>
          <Route path='/' element={<Navigate to='/dashboard' replace />}/>
          <Route path='dashboard' element={<DashboardScreen/>}/>
          <Route path='dashboard/text' element={<DashboardTextScreen/>}/>
        </Route>

        <Route path='/erro' element={<ErrorScreen />}/>
        <Route path='*' element={<NotFoundRouteScreen />}/>
      </Suspense>
    </Routes>
  );
};
