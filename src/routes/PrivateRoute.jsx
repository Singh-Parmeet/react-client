import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PrivateLayout } from '../layouts';

const PrivateRoute = ({ path, exact, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={({ match }) => (
      <PrivateLayout>
        <Component match={match} />
      </PrivateLayout>
    )}
  />
);

PrivateRoute.defaultProps = {
  exact: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

export default PrivateRoute;
