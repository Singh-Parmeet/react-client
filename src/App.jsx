import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { customTheme } from './theme';
import { PrivateRoute, AuthRoute } from './routes';
import {
  Trainee, TextFieldDemo, InputDemo, ChildrenDemo, Login, NoMatch,
} from './pages';

const App = () => (
  <Router>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Switch>
        <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
        <PrivateRoute path="/input-demo" component={InputDemo} />
        <PrivateRoute path="/children-demo" component={ChildrenDemo} />
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Trainee} />
        <PrivateRoute path="/trainee" component={Trainee} />
        <PrivateRoute component={NoMatch} />
      </Switch>
    </ThemeProvider>
  </Router>
);
export default App;
