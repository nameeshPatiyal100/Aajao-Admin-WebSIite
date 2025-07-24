import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

interface DeleteSnackbarProps {
  open: boolean;
  message: string;
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  autoHideDuration?: number;
}

const DeleteSnackbar: React.FC<DeleteSnackbarProps> = ({
  open,
  message,
  // onClose,
  autoHideDuration = 4000,
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={autoHideDuration}
      // onClose={onClose}
      sx={{
        '& .MuiSnackbarContent-root': {
          width: '100%',
          maxWidth: '500px', // Max width of the snackbar
        },
      }}
    >
      <Alert
        // onClose={onClose}
        severity="error"
        variant="filled"
        sx={{
          width: '100%',
          fontSize: '1rem',
          padding: '16px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default DeleteSnackbar;
