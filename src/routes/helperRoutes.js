import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth } from '../AuthContext';

export const PrivateRoute = ({ component, ...options }) => {
  const { usuario } = useContext(Auth);
  if (usuario) return <Route {...options} component={component} />;
  return <Redirect to="/login" />;
};

export const PublicRoute = ({ component, ...options }) => {
  const { usuario } = useContext(Auth);
  if (!usuario) return <Route {...options} component={component} />;
  return <Redirect to="/" />;
};

export const MixRoute = ({ component, ...options }) => {
  return <Route {...options} component={component} />;
};
