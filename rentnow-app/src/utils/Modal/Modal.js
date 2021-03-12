import React from "react";
import {
  Dialog as DialogMaterial,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: "center",

  },
  divider: {
    borderTop: "1px solid #BDBDBD",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(3),
    borderRadius: "0.5px",
  },
}));

const Modal = (props) => {
  const classes = useStyles();
  const { children, title, open, setOpen, size } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogMaterial fullWidth maxWidth={size} open={open} onClose={handleClose}>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Grid
          xs={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
        <Typography variant="h5">{title}</Typography>
          <IconButton aria-label="delete" className={classes.margin} size="small" onClick={handleClose}>
            <CancelOutlinedIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <hr className={classes.divider} />
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </DialogMaterial>
  );
}

export default Modal
