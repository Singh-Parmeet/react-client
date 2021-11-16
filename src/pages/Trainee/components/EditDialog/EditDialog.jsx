import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { isTouched } from '../../../../helpers/helpers';

const EditDialog = ({
  open, editData, onClose, onHandleChangeData, onSubmit,
}) => {
  const { name, email, touched } = editData;

  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Your Trainee Details
          </DialogContentText>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                fullWidth
                onChange={(event) => { onHandleChangeData(event, 'name'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={email}
                fullWidth
                onChange={(event) => { onHandleChangeData(event, 'email'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            disabled={!isTouched(touched)}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  editData: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onHandleChangeData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditDialog;
