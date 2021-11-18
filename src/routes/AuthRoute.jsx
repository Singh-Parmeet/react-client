import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, path }) => {
  const token = localStorage.getItem('token');
  const Rendering = (history) => {
    if (!token) {
      return (
        <AuthLayout>
          <Component history={history} />
        </AuthLayout>
      );
    }
    return (
      <Redirect to="/trainee" />
    );
  };
  return (
    <Route
      path={path}
      exact
      render={({ history }) => (
        <>
          {Rendering(history)}
        </>
      )}
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

export default AuthRoute;
