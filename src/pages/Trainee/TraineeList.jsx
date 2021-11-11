import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import trainees from './data/trainee';
import { Table } from '../../components';
import { Columns } from '../../config/constant';

const TraineeList = ({ match, history }) => {
  const schemaErrors = {};
  let validationResult = {};
  const [dialog, setDialog] = useState({
    addDialog: false,
    editDialog: false,
    removeDialog: false,
  });
  const [userData, setUserData] = useState({});
  const [editFormValues, setEditFormValues] = useState({
    name: '',
    email: '',
    touched: {},
  });
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
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

  /**    Form Validation  */

  const handleErrors = async (values) => {
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

  const handleAddDialogOpen = () => {
    setDialog({ ...dialog, addDialog: true });
  };

  const onChangeHandler = async (event, type) => {
    const { value = '' } = event.target;
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
    const { value = '' } = event.target;
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

  /**   Dialogbox Handlers    */

  const handleAddDialogClose = () => {
    setDialog({ ...dialog, addDialog: false });
  };

  const handleEditDialogOpen = ({ name, email }) => {
    setEditFormValues({ ...editFormValues, name, email });
    setDialog({ ...dialog, editDialog: true });
  };

  const handleEditDialogClose = () => {
    setDialog({ ...dialog, editDialog: false });
  };

  const handleRemoveDialogOpen = (data) => {
    setUserData(data);
    setDialog({ ...dialog, removeDialog: true });
  };

  const handleRemoveDialogClose = () => {
    setDialog({ ...dialog, removeDialog: false });
  };

  const onSubmit = () => {
    setDialog({ ...dialog, addDialog: false });
  };

  /** Pagination Handler */

  const handleSort = (field) => {
    setOrder(order === 'asc' && orderBy === field ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  /** link handlers */

  const handleSelect = (field) => {
    history.push(`${match.path}/${field}`);
  };

  /** User Handlers */

  const handleDeleteUser = () => {
    console.log('Deleted user', userData);
    setDialog({ ...dialog, removeDialog: false });
  };

  const handleChangeData = (event, type) => {
    const { value = '' } = event.target;
    touched[type] = true;
    const newValue = {
      ...editFormValues,
      touched,
      [type]: value,
    };
    setEditFormValues(newValue);
  };

  const onEditSubmit = () => {
    console.log(editFormValues);
    setDialog({ ...dialog, editDialog: false });
  };

  return (
    <>
      <Button variant="outlined" onClick={handleAddDialogOpen}>
        Add Trainee
      </Button>
      <AddDialog
        open={dialog?.addDialog}
        onClose={handleAddDialogClose}
        onBlurHandler={onBlurHandler}
        onChangeHandler={onChangeHandler}
        allValues={formValues}
        onSubmit={onSubmit}
      />
      <EditDialog
        open={dialog?.editDialog}
        editData={editFormValues}
        onClose={handleEditDialogClose}
        onHandleChangeData={handleChangeData}
        onSubmit={onEditSubmit}
      />
      <RemoveDialog
        open={dialog?.removeDialog}
        onClose={handleRemoveDialogClose}
        onDelete={handleDeleteUser}
      />
      <Box sx={{ margin: '20px' }}>
        <Table
          id="id"
          data={trainees}
          columns={Columns}
          orderBy={orderBy}
          order={order}
          sort={handleSort}
          select={handleSelect}
          count={100}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          actions={
            [
              {
                icon: <EditIcon />,
                handler: handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: handleRemoveDialogOpen,
              },
            ]
          }
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
