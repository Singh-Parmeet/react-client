import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import style from './style';
import { SnackBarContext } from '../../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../../libs/utils/api';

const Navbar = () => {
  const openSnackBar = useContext(SnackBarContext);

  const handClick = async () => {
    try {
      const { message } = await callApi('form/streams', 'get');
      openSnackBar(message, 'success');
    } catch (err) {
      openSnackBar(err, 'error');
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ToDo Portal
            </Typography>
            <Link to="/" style={style.linkUnderline}>
              <Button style={style.textColor} color="inherit">List</Button>
            </Link>
            <Button style={style.textColor} color="inherit" onClick={handClick}>Download</Button>
            <Link to="/logout" style={style.linkUnderline}>
              <Button style={style.textColor} color="inherit">Logout</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Navbar;
