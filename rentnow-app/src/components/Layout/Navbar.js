import React, { useState, useContext } from 'react';
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
	ClickAwayListener,
	Popper,
	Typography,
	Grid,
	Divider
} from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import rentnowLogo from 'assets/Landing/rentnow-logo-landing.png';
import { Link as LinkRouter } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AuthContext } from '../../Auth/Auth';
import { signOut } from 'api/auth';
import { useHistory } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventIcon from '@material-ui/icons/Event';
import * as Routes from 'constants/routes'

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
		display: 'flex',
		justifyContent: 'flex-end',
		[theme.breakpoints.down('sm')]: { display: 'none' },
	},
	rightLink: {
		fontSize: 13,
		color: theme.palette.primary.main,
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	toolbar: {
		justifyContent: 'space-between',
	},
	appbar: {
		backgroundColor: theme.palette.secondary.dark,
	},
	link: {
		textDecoration: 'none',
	},
	rightMenu: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end',
		[theme.breakpoints.up('md')]: { display: 'none' },
	},
	paper: {
		backgroundColor: theme.palette.secondary.dark,
		marginTop: '15px',
		[theme.breakpoints.up('md')]: { display: 'none' },
	},
	logoWeb: {
		maxWidth: 250,
		marginTop: 5,
		[theme.breakpoints.down('sm')]: { display: 'none' },

	},
	logoMobile: {
		maxWidth: 200,
		marginTop: 5,
		[theme.breakpoints.up('md')]: { display: 'none' },
	},
	avatar: {
		color: '#FAFAFA'
	},
	container: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	divider: {
		width: 'inherit',
		backgroundColor: '#FEFEFE',
	},
	reservasButton: {
		fontSize: 13,
		color: '#FAFAFA',
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		borderColor: '#FAFAFA'
	}
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
		<Popper anchorEl={props.referencia} open={props.open}>
			<Paper className={classes.paper}>
				<MenuList>
					{props.currentUser === null ? (
						<>
							<MenuItem>
								<LinkRouter to="/login" className={classes.link}>
									<Button color="primary" className={classes.rightLink}>
										<b>Iniciar Sesión</b>
									</Button>
								</LinkRouter>
							</MenuItem>
							<MenuItem>
								<Button className={classes.rightLink} color="primary" href="#Contacto">
									<b>Registrate</b>
								</Button>
							</MenuItem>
						</>
					) : (
						<div>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								className={classes.container}
							>
								<AccountCircleIcon className={classes.avatar} fontSize="large" />
								<Typography className={classes.avatar} align='center' variant='subtitle1'>
									{props.currentUser.displayName ? props.currentUser.displayName : ""}
								</Typography>
								<Typography className={classes.avatar} variant='subtitle2' align='center'>
									{props.currentUser.email ? props.currentUser.email : ""}
								</Typography>
							</Grid>
							<Divider className={classes.divider} variant='fullWidth' />
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								className={classes.container}
							>
								<Button
									fullWidth
									onClick={props.handleRouteMisReservas}
									variant='outlined'
									className={classes.reservasButton}
									startIcon={<EventIcon />}
								>
									Mis Reservas
								</Button>
							</Grid>
							<Divider className={classes.divider} variant='fullWidth' />
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								className={classes.container}
							>
								<Button onClick={props.handleLogOut} color="primary" className={classes.rightLink} startIcon={<ExitToAppIcon />}>
									<b>Cerrar Sesión</b>
								</Button>
							</Grid>
						</div>
					)}
				</MenuList>
			</Paper>
		</Popper>
	);
};

const Navbar = (props) => {
	const classes = useStyles();
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	const anchorRef = React.useRef(null);
	const { currentUser } = useContext(AuthContext);
	console.log(currentUser)

	const history = useHistory();

	const handleRouteMisReservas = () => {
		history.push(Routes.CONSULTAR_RESERVAS);
		setRightMenuOpen(false)
	}

	const handleRightMenuOpen = () => {
		setRightMenuOpen(!rightMenuOpen);
	};

	const handleRightMenuClose = () => {
		setRightMenuOpen(false);
		console.log('hola')
	}

	const handleLogOut = () => {
		signOut()
			.then((resp) => {
				if (resp.status === 'OK') {
					history.push(Routes.LOGIN);
				}
			})
			.catch(() => {
				console.log('BAD LOGOUT');
			});
	};

	return (
		<ElevationScroll {...props} currentUser={currentUser} handleLogOut={handleLogOut}>
			<AppBar position="fixed" className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					<div />
					<Link variant="h5" underline="none" className={classes.title} href="">
						<Typography align="center" className={classes.title}>
							<img src={rentnowLogo} alt="logo" className={classes.logoWeb} />
							<img src={rentnowLogo} alt="logo" className={classes.logoMobile} />
						</Typography>

					</Link>
					{currentUser === null ? (
						<div className={classes.rightLinks}>
							<LinkRouter to="/login" className={classes.link}>
								<Button color="primary" className={classes.rightLink}>
									<b>Iniciar Sesión</b>
								</Button>
							</LinkRouter>
							<Button className={classes.rightLink} color="primary" href="">
								<b>Registrate</b>
							</Button>
						</div>
					) : (
						<div className={classes.rightLinks}>
							<Button color="primary" className={classes.rightLink} onClick={handleLogOut}>
								<b>Cerrar Sesión</b>
							</Button>
						</div>
					)}
					<ClickAwayListener onClickAway={handleRightMenuClose}>
						<div className={classes.rightMenu}>
							<IconButton ref={anchorRef} className={classes.avatar} onClick={handleRightMenuOpen}>
								<AccountCircleIcon />
							</IconButton>
							<RightMenu
								referencia={anchorRef.current}
								open={rightMenuOpen}
								handleRightMenuOpen={handleRightMenuOpen}
								handleLogOut={handleLogOut}
								currentUser={currentUser}
								handleRouteMisReservas={handleRouteMisReservas}
								setRightMenuOpen={setRightMenuOpen}
								handleRightMenuClose={handleRightMenuClose}
							/>
						</div>
					</ClickAwayListener>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};

export default Navbar;
