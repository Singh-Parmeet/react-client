import React from 'react';
import { PropTypes } from 'prop-types';
import { Navbar } from '../components';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLayout;
