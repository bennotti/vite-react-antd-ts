import React, { FC } from 'react'
import { Navigate, Outlet, RouteProps } from 'react-router-dom'
import { LocalStorageHelper } from '../../helper/local-storage-helper';

const isAutenticado = (): boolean => {
  const user = LocalStorageHelper.getFromJson('userAutenticado');
  return !!user;
};

const PublicRoutes: FC<RouteProps> = () => {
  const isAutenticadoResponse = isAutenticado();
  return isAutenticadoResponse? <Navigate to="/dashboard"/> : <Outlet/>
}

export default PublicRoutes;