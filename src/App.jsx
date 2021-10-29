import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme } from './theme';
import { Trainee, Login, Navbar } from './pages';

const App = () => (
  <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <Navbar />
    <Trainee />
    <Login />
  </ThemeProvider>
);
export default App;
