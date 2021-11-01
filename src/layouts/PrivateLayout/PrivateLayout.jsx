import React from 'react';
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import { Navbar } from '../components';

const PrivateLayout = ({ children }) => (
  <>
    <Navbar />
    <Box m={2}>{children}</Box>
  </>
);
PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLayout;
