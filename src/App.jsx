import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { customTheme } from './theme';
import {
  Trainee,
} from './pages';
import { SnackBarProvider } from './contexts';
import { Navbar } from './layouts';

const App = () => (
  <Router>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <SnackBarProvider>
        <Navbar />
        <br />
        <Switch>
          {/* <AuthRoute exact path="/login" component={Login} /> */}
          <Route path="/" component={Trainee} />
          {/* <PrivateRoute path="/todo" component={Trainee} /> */}
          {/* <PrivateRoute component={NoMatch} /> */}
        </Switch>
      </SnackBarProvider>
    </ThemeProvider>
  </Router>
);
export default App;
