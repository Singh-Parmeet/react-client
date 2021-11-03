import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ path, exact, component: Component }) => {
  const token = localStorage.getItem('token');
  const Rendering = (match, history) => {
    if (token) {
      return (
        <PrivateLayout>
          <Component match={match} history={history} />
        </PrivateLayout>
      );
    }
    return (
      <Redirect to="/login" />
    );
  };
  return (
    <>
      <Route
        path={path}
        exact={exact}
        render={({ match, history }) => (
          <>
            {Rendering(match, history)}
          </>
        )}
      />
    </>
  );
};

PrivateRoute.defaultProps = {
  exact: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default PrivateRoute;
