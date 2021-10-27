import React, { useState } from 'react';
import * as Yup from 'yup';
import { AddDialog } from './components';

const Trainee = () => {
  const schemaErrors = {};
  let validationResult = {};
  const [open, setOpen] = useState(false);
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
    console.log({ name: formValues.name, email: formValues.email, password: formValues.password });
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

  return (
    <>
      <AddDialog
        open={open}
        handleClickOpen={handleClickOpen}
        onClose={handleClose}
        onBlurHandler={onBlurHandler}
        onChangeHandler={onChangeHandler}
        allValues={formValues}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Trainee;
