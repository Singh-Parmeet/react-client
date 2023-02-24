/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
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
  const limit = 10;
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
  // const [userData, setUserData] = useState({});
  const [editFormValues, setEditFormValues] = useState({
    status: '',
    touched: {},
  });
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    status: '',
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
  const {
    title, description, touched,
  } = formValues;

  const traineeSchema = Yup.object({
    title: Yup.string().min(3).max(10).label('Title')
      .required(),
    description: Yup.string().min(3).max(50).label('Description')
      .required(),
    status: Yup.string().min(3).max(10).label('Status')
      .required(),
  });

  /**    Form Validation  */

  const handleErrors = async (values) => {
    const {
      title: newTitle, description: newDescription, status: newStatus,
    } = values;
    return traineeSchema.validate({
      title: newTitle, description: newDescription, status: newStatus,
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
    // console.log('>>>>>>>>>>>>>>>>>newValue', newValue);
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
    const { originalId, status: editedStatus } = editData;
    setEditFormValues({
      ...editFormValues, editedStatus, originalId,
    });
    setDialog({ ...dialog, editDialog: true });
  };

  const handleEditDialogClose = () => {
    setDialog({ ...dialog, editDialog: false });
  };

  const handleRemoveDialogOpen = (data) => {
    DeletedUserData(data);
    setDialog({ ...dialog, removeDialog: true });
  };

  const handleRemoveDialogClose = () => {
    setDialog({ ...dialog, removeDialog: false });
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

  // const handClick = async () => {
  //   try {
  //     const { message } = await callApi('todo/streams', 'get');
  //     openSnackBar(message, 'success');
  //   } catch (err) {
  //     openSnackBar(err, 'error');
  //   }
  // };

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

  const onAddUser = async () => {
    try {
      setDialog({ ...dialog, addDialog: false });
      if (page > 0 && trainees.length === limit) {
        setPage(page + 1);
      }
      const { status: formStatus } = formValues;
      const { message } = await callApi('form/', 'post', { title, description, status: formStatus });
      openSnackBar(message, 'success');
      setFormValues({
        title: '',
        description: '',
        status: '',
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
      if (moment(createdAt).isBefore('2022-02-20')) {
        openSnackBar('Error: Cannot delete List ', 'error');
      } else {
        const { status, message } = await callApi('todo/', 'delete', { originalId }, {});
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

  const onEditUser = async () => {
    try {
      const { originalId, editedStatus } = editFormValues;
      const { message } = await callApi('todo/', 'put', {
        originalId, status: editedStatus,
      }, {});
      setDialog({ ...dialog, editDialog: false });
      openSnackBar(message, 'success');
    } catch (err) {
      openSnackBar(err, 'error');
      setDialog({ ...dialog, editDialog: false });
    }
  };

  const listHandler = async () => {
    try {
      skip = limit * page;
      setTraineesData({ ...traineesData, traineeLoader: true });
      const { data, total } = await callApi('form/cron/', 'get', {}, { skip, limit });
      setTraineesData({
        ...traineesData, trainees: data, traineeLoader: false, count: total,
      });
    } catch (err) {
      setTraineesData({ ...traineesData, traineeLoader: false });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      listHandler();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [skip, page, dialog]);
  console.log('>>>>>>>>>>..formValues', formValues);
  return (
    <>
      <Button variant="outlined" onClick={handleAddDialogOpen}>
        Add List
      </Button>
      <AddDialog
        open={dialog?.addDialog}
        onClose={handleAddDialogClose}
        onBlurHandler={onBlurHandler}
        onChangeHandler={onChangeHandler}
        allValues={formValues}
        onSubmit={onAddUser}
      />
      <EditDialog
        open={dialog?.editDialog}
        editData={editFormValues}
        onClose={handleEditDialogClose}
        onHandleChangeData={handleChangeData}
        onSubmit={onEditUser}
      />
      <RemoveDialog
        open={dialog?.removeDialog}
        onClose={handleRemoveDialogClose}
        onDelete={onDeleteUser}
      />
      <br />
      {/* <Button variant="outlined" onClick={handClick}>Fetch Data</Button> */}
      <br />
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
