/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { getError, hasErrors, isTouched } from '../../helpers/helpers';
// import { callApi } from '../../libs/utils/api';
import { SnackBarContext } from '../../contexts/SnackBarProvider/SnackBarProvider';
import { LOGIN_USER } from './mutation';

const Login = ({ history }) => {
  const schemaErrors = {};
  let validationResult = {};
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
    touched: {},
    errors: {},
  });
  const openSnackBar = useContext(SnackBarContext);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (Data) => {
      const { data, message, status } = Data.loginUser;
      localStorage.setItem('token', data.token);
      openSnackBar(message, status);
      history.push('/trainee');
    },
    onError: (err) => {
      openSnackBar(err?.graphQLErrors[0]?.extensions?.response?.body.message || err?.message, 'error');
    },
  });
  const [isLoading, setIsLoading] = useState(loading);
  const { email, password, touched } = loginValues;

  const traineeSchema = Yup.object({
    email: Yup.string().email('Email Address must be a valid email').label('Email').required(),
    password: Yup.string().label('Password').required(),
  });

  const handleErrors = (values) => {
    const {
      name: newName, email: newEmail, password: newPassword, confirmPassword: newConfirmPassword,
    } = values;
    return traineeSchema.validate({
      name: newName, email: newEmail, password: newPassword, confirmPassword: newConfirmPassword,
    }, { abortEarly: false })
      .then(() => ({}))
      .catch((allErrors) => {
        if (allErrors) {
          allErrors.inner.forEach((err) => { schemaErrors[err.path] = err.message; });
        }
        return schemaErrors;
      });
  };

  const onChangeHandler = async (event, type) => {
    const { value } = event.target;
    touched[type] = true;
    const newValue = {
      ...loginValues,
      touched,
      [type]: value,
    };
    validationResult = await handleErrors(newValue);
    setLoginValues({ ...newValue, errors: validationResult });
  };

  const onBlurHandler = async (event, type) => {
    const { value } = event.target;
    if (value === '') {
      touched[type] = true;
      const newValue = {
        ...loginValues,
        touched,
      };
      validationResult = await handleErrors(newValue);
      setLoginValues({ ...newValue, errors: validationResult });
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    await loginUser({ variables: { email, password } });
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          >
            <Avatar
              sx={{
                bgcolor: red[500],
              }}
            >
              <LockRoundedIcon />
            </Avatar>
            <Typography variant="h5" component="div">
              Login
            </Typography>
          </Box>
          <TextField
            error={getError(loginValues, 'email')}
            label="Email"
            sx={{ my: 2 }}
            value={email}
            helperText={getError(loginValues, 'email')}
            fullWidth
            onChange={(event) => { onChangeHandler(event, 'email'); }}
            onBlur={(event) => { onBlurHandler(event, 'email'); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            error={getError(loginValues, 'password')}
            label="Password"
            type="password"
            sx={{ my: 2 }}
            helperText={getError(loginValues, 'password')}
            value={password}
            fullWidth
            onChange={(event) => { onChangeHandler(event, 'password'); }}
            onBlur={(event) => { onBlurHandler(event, 'password'); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{ my: 2 }}
            loading={isLoading}
            disabled={hasErrors(loginValues?.errors) || !isTouched(loginValues?.touched)}
            onClick={() => (handleLogin())}
          >
            SIGN IN
          </LoadingButton>
        </CardContent>
      </Card>
    </Box>
  );
};

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Login;
