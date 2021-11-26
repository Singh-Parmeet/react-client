import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import { Table } from '../../components';
import { Columns } from '../../config/constant';
import { SnackBarContext } from '../../contexts/SnackBarProvider/SnackBarProvider';
import { callApi } from '../../libs/utils/api';

const TraineeList = (props) => {
  const { match, history } = props;
  const limit = 7;
  let skip;
  const schemaErrors = {};
  let validationResult = {};
  const openSnackBar = useContext(SnackBarContext);
  const [dialog, setDialog] = useState({
    addDialog: false,
    editDialog: false,
    removeDialog: false,
  });
  const [deletedUserData, DeletedUserData] = useState({});
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
  const handleAddDialogOpen = () => {
    setDialog({ ...dialog, addDialog: true });
  };

  const handleEditDialogOpen = async (editData) => {
    const { originalId, name: editedName, email: editedEmail } = editData;
    setEditFormValues({
      ...editFormValues, originalId, editedName, editedEmail,
    });
    setDialog({ ...dialog, editDialog: true });
  };

  const handleRemoveDialogOpen = (data) => {
    DeletedUserData(data);
    setDialog({ ...dialog, removeDialog: true });
  };

  const handleDialogClose = (type) => {
    const newValue = {
      ...dialog,
      [type]: false,
    };
    setDialog(newValue);
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
  const handleOpenDetails = (field) => {
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
  const onAddUser = async () => {
    try {
      setDialog({ ...dialog, addDialog: false });
      if (page > 0 && trainees.length === limit) {
        setPage(page + 1);
      }
      const { message, status } = await callApi('user/', 'post', { name, email, role: 'trainee' });
      openSnackBar(message, status);
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        touched: {},
        errors: {},
      });
    } catch (err) {
      openSnackBar(err, 'error');
      setDialog({ ...dialog, addDialog: false });
    }
  };

  const onDeleteUser = async () => {
    try {
      const { originalId, createdAt } = deletedUserData;
      console.log(originalId, createdAt);
      if (moment(createdAt).isBefore('2019-02-14')) {
        openSnackBar('Error: Cannot delete User ', 'error');
      } else {
        const { status, message } = await callApi('user/', 'delete', { originalId }, {});
        openSnackBar(message, status);
        if (page > 0 && trainees.length === 1) {
          setPage(page - 1);
        }
      }
      setDialog({ ...dialog, removeDialog: false });
    } catch (err) {
      openSnackBar(err, 'error');
      setDialog({ ...dialog, removeDialog: false });
    }
  };

  const onEditUser = async () => {
    try {
      const { originalId, editedName, editedEmail } = editFormValues;
      const { message, status } = await callApi('user/', 'put', {
        originalId, name: editedName, role: 'trainee', email: editedEmail,
      }, {});
      setDialog({ ...dialog, editDialog: false });
      openSnackBar(message, status);
    } catch (err) {
      openSnackBar(err, 'error');
      setDialog({ ...dialog, editDialog: false });
    }
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
  const traineesListHandler = async () => {
    try {
      skip = limit * page;
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
  }, [skip, page, dialog]);

  return (
    <>
      <Button variant="outlined" onClick={handleAddDialogOpen}>
        Add Trainee
      </Button>
      <AddDialog
        open={dialog?.addDialog}
        onClose={handleDialogClose}
        onBlurHandler={onBlurHandler}
        onChangeHandler={onChangeHandler}
        allValues={formValues}
        onSubmit={onAddUser}
      />
      <EditDialog
        open={dialog?.editDialog}
        editData={editFormValues}
        onClose={handleDialogClose}
        onHandleChangeData={handleChangeData}
        onSubmit={onEditUser}
      />
      <RemoveDialog
        open={dialog?.removeDialog}
        onClose={handleDialogClose}
        onSubmit={onDeleteUser}
      />
      <Box sx={{ margin: '20px' }}>
        <Table
          loader={traineeLoader}
          dataLength={trainees?.length}
          id="id"
          data={trainees}
          columns={Columns}
          orderBy={orderBy}
          order={order}
          sort={handleSort}
          select={handleOpenDetails}
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
