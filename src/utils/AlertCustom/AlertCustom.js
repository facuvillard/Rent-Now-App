import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AlertCustom = ({
  open,
  setOpen,
  type = 'info',
  text = '',
  duration = 3000,
  infinite = false,
  vertical = 'top',
  horizontal = 'center',
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={infinite ? null : duration}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert
        variant="filled"
        severity={type || 'info'}
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ width: '100%', borderRadius: 2, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertCustom;
