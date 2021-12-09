import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { customTheme } from './theme';
import { PrivateRoute, AuthRoute } from './routes';
import {
  Trainee, TextFieldDemo, InputDemo, ChildrenDemo, Login, NoMatch,
} from './pages';
import { SnackBarProvider } from './contexts';
import apolloClient from './libs/apollo-client';

const App = () => (
  <Router>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <SnackBarProvider>
          <Switch>
            <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Trainee} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </SnackBarProvider>
      </ApolloProvider>
    </ThemeProvider>
  </Router>
);
export default App;
