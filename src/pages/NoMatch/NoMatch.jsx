import React from 'react';
import Typography from '@mui/material/Typography';

const NoMatch = () => (
  <>
    <Typography component="h1" variant="h1" align="center" color="textPrimary">
      Not Found
    </Typography>
    <Typography variant="h6" align="center" color="textSecondary">
      Seems like the page you are looking after does not exist.
    </Typography>
  </>
);

export default NoMatch;
