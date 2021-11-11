import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { AddDialog } from './components';
import trainees from './data/trainee';
import { Table } from '../../components';
import { Columns } from '../../config/constant';

const TraineeList = ({ match, history }) => {
  const schemaErrors = {};
  let validationResult = {};
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    touched: {},
    errors: {},
  });

  const { touched } = formValues;

  const traineeSchema = Yup.object({
    name: Yup.string().min(3).max(10).label('Name')
      .required(),
    email: Yup.string().email('Email Address must be a valid email').label('Email').required(),
    password: Yup.string()
      .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Must contains 8 characters, at least one uppercase letter,one lowercase letter and one number')
      .required('Password is a required field'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .when('password', {
        is: (password) => (!!(password && password.length > 0)),
        then: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match"),
      }),
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(false);
  };

  const onChangeHandler = async (event, type) => {
    const { value } = event.target;
    touched[type] = true;
    const newValue = {
      ...formValues,
      touched,
      [type]: value,
    };
    validationResult = await handleErrors(newValue);
    setFormValues({ ...newValue, errors: validationResult });
  };

  const onBlurHandler = async (event, type) => {
    const { value } = event.target;
    if (value === '') {
      touched[type] = true;
      const newValue = {
        ...formValues,
        touched,
      };
      validationResult = await handleErrors(newValue);
      setFormValues({ ...newValue, errors: validationResult });
    }
  };

  const handleSort = (field) => {
    setOrder(order === 'asc' && orderBy === field ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const handleSelect = (field) => {
    history.push(`${match.path}/${field}`);
  };

  console.log('TraineeList history', history);
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Trainee
      </Button>
      <AddDialog
        open={open}
        handleClickOpen={handleClickOpen}
        onClose={handleClose}
        onBlurHandler={onBlurHandler}
        onChangeHandler={onChangeHandler}
        allValues={formValues}
        onSubmit={onSubmit}
      />
      <Box sx={{ margin: '20px' }}>
        <Table
          id="id"
          data={trainees}
          columns={Columns}
          columnHeadingColor="#928d8d"
          orderBy={orderBy}
          order={order}
          sort={handleSort}
          select={handleSelect}
        />
      </Box>
    </>
  );
};

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TraineeList;
