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
        <DialogTitle>Add Todo List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter The Details
          </DialogContentText>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                error={getError(allValues, 'title') || false}
                label="Title"
                value={allValues?.title}
                helperText={getError(allValues, 'title')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'title'); }}
                onBlur={(event) => { onBlurHandler(event, 'title'); }}
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
                error={getError(allValues, 'description') || false}
                label="Description"
                value={allValues?.description}
                helperText={getError(allValues, 'description')}
                fullWidth
                onChange={(event) => { onChangeHandler(event, 'description'); }}
                onBlur={(event) => { onBlurHandler(event, 'description'); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
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
