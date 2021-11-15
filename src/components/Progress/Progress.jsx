import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const Progress = ({ color }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <CircularProgress color={color} />
  </Box>
);

Progress.defaultProps = {
  color: 'primary',
};

Progress.propTypes = {
  color: PropTypes.string,
};

export default Progress;
