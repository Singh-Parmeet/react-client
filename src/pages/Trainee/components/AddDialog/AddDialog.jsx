import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import Grid from '@mui/material/Grid';
import { getError, hasErrors, isTouched } from '../../../../helpers/helpers';

const AddDialog = (props) => {
  const {
    open, onClose, onSubmit, onChangeHandler, onBlurHandler, allValues,
  } = props;
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Add Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Your Trainee Details
          </DialogContentText>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                error={getError(allValues, 'name') || false}
                label="Name"
                value={allValues?.name}
                helperText={getError(allValues, 'name')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'name'); }}
                onBlur={(event) => { onBlurHandler(event, 'name'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={getError(allValues, 'email') || false}
                label="Email"
                value={allValues?.email}
                helperText={getError(allValues, 'email')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'email'); }}
                onBlur={(event) => { onBlurHandler(event, 'email'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={getError(allValues, 'password') || false}
                label="Password"
                type="password"
                helperText={getError(allValues, 'password')}
                value={allValues?.password}
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={getError(allValues, 'confirmPassword') || false}
                label="Confirm Password"
                type="password"
                helperText={getError(allValues, 'confirmPassword')}
                value={allValues?.confirmPassword}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'confirmPassword'); }}
                onBlur={(event) => { onBlurHandler(event, 'confirmPassword'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Visibility />
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
            onClick={onSubmit}
            disabled={hasErrors(allValues?.errors) || !isTouched(allValues?.touched)}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddDialog.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  allValues: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AddDialog;
