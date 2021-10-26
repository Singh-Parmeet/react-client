import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trainee Portal
        </Typography>
        <Button color="inherit">Trainee</Button>
        <Button color="inherit">TextField Demo</Button>
        <Button color="inherit">Input Demo</Button>
        <Button color="inherit">Children Demom</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
