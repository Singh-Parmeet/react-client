import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import { GenericTable } from '../../components';
import { Columns } from '../../config/constant';
import { SnackBarContext } from '../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../libs/utils/api';

const TraineeList = (props) => {
  const { match, history } = props;
  const limit = 10;
  const schemaErrors = {};
  let validationResult = {};
  const openSnackBar = useContext(SnackBarContext);
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
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    touched: {},
    errors: {},
  });
  const [traineesData, setTraineesData] = useState(
    {
      trainees: [],
      traineeLoader: false,
      count: 0,
    },
  );
  const { trainees, traineeLoader, count } = traineesData;
  const { name, email, touched } = formValues;

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

  const handleEditDialogOpen = (editData) => {
    const { name: editedName, email: editedEmail } = editData;
    setEditFormValues({ ...editFormValues, editedName, editedEmail });
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

  const onSubmit = async () => {
    setDialog({ ...dialog, addDialog: false });
    const { data } = await callApi('user/', 'post', { name, email, role: 'trainee' });
    console.log(data);
    openSnackBar('Trainee Added Successfully', 'success');
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {},
      errors: {},
    });
  };

  /** Pagination Handler */

  const handleSort = (field) => {
    setOrder(order === 'asc' && orderBy === field ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  const findTrainee = (id) => trainees.find((item) => (item.originalId === id));

  /** link handlers */
  const handleSelect = (field) => {
    const res = findTrainee(field);
    history.push(
      {
        pathname: `${match.path}/${field}`,
        state: {
          response: res,
        },
      },
    );
  };

  /** User Handlers */
  const handleDeleteUser = () => {
    console.log('Deleted user', userData);
    setDialog({ ...dialog, removeDialog: false });
    const date = userData?.createdAt.split('T')[0];
    const severity = moment(date).isBefore('2019-02-14') ? 'error' : 'success';
    const msg = severity === 'error' ? 'Error: Cannot delete Trainee' : 'Trainee Deleted Successfully';
    openSnackBar(msg, severity);
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
    openSnackBar('Trainee Updated Successfully', 'success');
  };

  const traineesListHandler = async () => {
    try {
      const skip = limit * page;
      setTraineesData({ ...traineesData, traineeLoader: true });
      const { data, total } = await callApi('user/', 'get', {}, { skip, limit });
      setTraineesData({
        ...traineesData, trainees: data, traineeLoader: false, count: total,
      });
    } catch (err) {
      setTraineesData({ ...traineesData, traineeLoader: false });
    }
  };

  useEffect(() => {
    traineesListHandler();
    // return () => { console.log('clean up'); };
  }, [page, count]);
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
        <GenericTable
          loader={traineeLoader}
          dataLength={trainees?.length}
          id="id"
          data={trainees}
          columns={Columns}
          orderBy={orderBy}
          order={order}
          sort={handleSort}
          select={handleSelect}
          count={count}
          page={page}
          rowsPerPage={limit}
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
