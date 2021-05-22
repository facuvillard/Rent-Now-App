
import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const DialogCustom = (props) => {
    const { open, title, children, onClose} = props;

    return (
        <Dialog  aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            {children}  
        </Dialog>
    )
}

export default DialogCustom;