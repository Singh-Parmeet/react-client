import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const RemoveDialog = ({ open, onClose, onDelete }) => (
  <Box>
    <Dialog open={open} fullWidth>
      <DialogTitle>Remove Trainee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to remove trainee?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onDelete}> DELETE </Button>
      </DialogActions>
    </Dialog>
  </Box>
);
RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RemoveDialog;
