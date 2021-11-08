import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from './style';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trainee Portal
        </Typography>
        <Link to="/" style={style.linkUnderline}>
          <Button style={style.textColor} color="inherit">Trainee</Button>
        </Link>
        <Link to="/text-field-demo" style={style.linkUnderline}>
          <Button style={style.textColor} color="inherit">TextField Demo</Button>
        </Link>
        <Link to="/input-demo" style={style.linkUnderline}>
          <Button style={style.textColor} color="inherit">Input Demo</Button>
        </Link>
        <Link to="/children-demo" style={style.linkUnderline}>
          <Button style={style.textColor} color="inherit">Children Demo</Button>
        </Link>
        <Link to="/logout" style={style.linkUnderline}>
          <Button style={style.textColor} color="inherit">Logout</Button>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
