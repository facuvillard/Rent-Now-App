import React from "react";
import Navbar from "components/Layout/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Fab } from "@material-ui/core";
import * as Routes from "constants/routes"
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    color: "#fff",
  },
  returnButton: {
    position: 'fixed',
    top: theme.spacing(11),
    left: theme.spacing(2),
    zIndex: 5,
    boxShadow: "5px 5px 5px 1px rgba(0, 0, 0, 0.3)"
  },
}));

const LayoutWithNavbar = (props) => {
  console.log(props)
  const classes = useStyles();
  const history = useHistory();

  const handleRouteComplejo = () => {
    if (props.location.state && props.location.state.includes('confirmar')) {
      history.push(Routes.COMPLEJOS)
    }
    else {
      history.goBack();
    }
  }

  return (
    <div>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
        {history.location.pathname !== Routes.COMPLEJOS ? (
          <Fab
            aria-label='returnButton'
            className={classes.returnButton}
            color='secondary'
            onClick={handleRouteComplejo}
          >
            <ChevronLeftIcon />
          </Fab>
        ) : (
          null
        )}
      </main>
    </div>
  );
};

export default withRouter(LayoutWithNavbar);