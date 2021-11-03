import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Footer } from '../components';

const AuthLayout = ({ children }) => (
  <>
    <Box m={6}>
      { children }
      <Box mt={2}><Footer /></Box>
    </Box>
  </>
);

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
