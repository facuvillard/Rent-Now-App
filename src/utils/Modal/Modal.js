import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Modal = ({ children, title, open, setOpen, size = 'sm' }) => {
  const handleClose = () => {
    if (typeof setOpen === 'function') {
      setOpen(false);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={size}
      open={Boolean(open)}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <IconButton aria-label="close" size="small" onClick={handleClose} sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 1.5 }} />
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
