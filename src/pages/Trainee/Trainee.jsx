import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import TraineeDetail from './TraineeDetail';
import TraineeList from './TraineeList';

const Trainee = ({ match: { path } }) => (
  <Switch>
    <Route exact path="/" component={TraineeList} />
    <Route exact path={`${path}/:id`} component={TraineeDetail} />
  </Switch>
);

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default Trainee;
