import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  makeStyles,
  Link,
  Button,
  IconButton,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Typography,
  ClickAwayListener
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import rentnowLogo from "assets/Landing/rentnow-logo-landing.png";
import { Link as LinkRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  leftLinkActive: {
    color: theme.palette.primary.main,
  },
  rightLinks: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  rightLink: {
    fontSize: 13,
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  toolbar: {
    justifyContent: "space-between",
  },
  appbar: {
    backgroundColor: theme.palette.secondary.dark,
  },
  link: {
    textDecoration: "none",
  },
  rightMenu: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.up("md")]: { display: "none" },
  },
  paper: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: "15px",
    [theme.breakpoints.up("md")]: { display: "none" },
  },
  logo: {
    maxWidth: 250,
    marginTop: 5,
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const RightMenu = (props) => {
  const classes = useStyles();
  return (
    <Popper id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}>
      <Paper className={classes.paper}>
        <MenuList>
          <MenuItem>
            <LinkRouter to="/login" className={classes.link}>
              <Button color="primary" className={classes.rightLink}>
                <b>Iniciar Sesión</b>
              </Button>
            </LinkRouter>
          </MenuItem>
          <MenuItem>
            <Button
              className={classes.rightLink}
              color="primary"
              href="#Contacto">
              <b>Registrate</b>
            </Button>
          </MenuItem>
        </MenuList>
      </Paper>
    </Popper>
  );
};

const Navbar = (props) => {
  const classes = useStyles();


  const [anchorEl, setAnchorEl] = useState(null);

  const handleHelpClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleHelpClose = () => {
    setAnchorEl((oldState) => !oldState);
  };

  const helpOpen = Boolean(anchorEl);
  const id = helpOpen ? 'simple-popover' : undefined;

  return (
    <ElevationScroll {...props}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div />
          <Link variant="h5" underline="none" className={classes.title} href="">
            <Typography align="center" className={classes.title}>
              <img src={rentnowLogo} alt="logo" className={classes.logo} />
            </Typography>
          </Link>
          <div className={classes.rightLinks}>
            <LinkRouter to="/login" className={classes.link}>
              <Button color="primary" className={classes.rightLink}>
                <b>Iniciar Sesión</b>
              </Button>
            </LinkRouter>
            <Button
              className={classes.rightLink}
              color="primary"
              href=""
            >
              <b>Registrate</b>
            </Button>
          </div>
          <ClickAwayListener onClickAway={()=>setAnchorEl(false)}>
            <div className={classes.rightMenu}>
              <IconButton
                aria-describedby={id}
                color="primary"
                onClick={handleHelpClick}
              >
                <MenuIcon />
              </IconButton>
              <RightMenu
                open={helpOpen}
                anchorEl={anchorEl}
                id={id}
                handleHelpClick={handleHelpClose}
              />
            </div>
          </ClickAwayListener>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;