import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isConnected, ...rest }) => (
  <Route
    {...rest}
    render={() => (
      isConnected
        ? <Component {...rest} />
        : <Redirect to="/" />
    )}
  />
);
export default PrivateRoute;