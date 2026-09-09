import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

const DialogCustom = ({ open, title, children, onClose, maxWidth = 'sm' }) => {
  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
        <DialogTitle sx={{ fontWeight: 700, flex: 1, m: 0, p: 2 }}>{title}</DialogTitle>
        <IconButton onClick={onClose} size="small" aria-label="close" sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 1, px: 2 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogCustom;
