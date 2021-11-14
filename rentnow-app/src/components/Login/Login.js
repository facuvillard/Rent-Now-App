import { Avatar, Button, CircularProgress, Container, IconButton, Paper, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import RegisterExtraData from 'components/Login/RegisterExtraData';
import { loginWithGmail } from 'firebase.js';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Link from 'utils/LinkCustom/Link';
import * as Routes from '../../constants/routes';
import { recoverAndResetPassword, signIn } from '../../api/auth';
import AlertCustom from './../../utils/AlertCustom/AlertCustom';


const useStyles = makeStyles((theme) => ({
	main: {
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	paper: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href={Routes.LANDING}>
				RentNow
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const Login = () => {
	const classes = useStyles();
	const [showAlert, setShowAlert] = useState(false);
	const [alertProps, setAlertProps] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [showNewUserForm, setShowNewUserForm] = useState(false);
	const [userData, setUserData] = useState({});
	const history = useHistory();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			handleSubmit(values.email, values.password);
		},
	});

	const handleSubmit = async (email, password) => {
		setIsLoading(true);
		const response = await signIn(email, password);
		if (response.status === 'OK') {
			setAlertProps({
				type: 'success',
				text: response.message,
			});
			setShowAlert(true);
			history.push("/complejos");
		} else {
			setAlertProps({
				type: 'error',
				text: response.message,
			});
			setShowAlert(true);
			setIsLoading(false);
		}
	};

	const handleLoginWithGmail = () => {
		loginWithGmail()
			.then((user) => {
				if (user.additionalUserInfo.isNewUser) {
					setUserData({
						uid: user.user.uid,
						email: user.additionalUserInfo.profile.email,
					});
					setShowNewUserForm(true);
				} else {
					history.push('/complejos');
				}
			})
			.catch(() => {
				setIsLoading(false);
				setAlertProps({
					type: 'error',
					text: 'Error de logueo!',
				});
				setShowAlert(true);
			});
	};

	if (showNewUserForm) {
		return (
			<Container component="main" maxWidth="xs">
				<RegisterExtraData userData={userData}/>
			</Container>
		);
	}

	const handleClickRecoverAndResetPassword = async (email) => {
		const result = await recoverAndResetPassword(email);

		if (result.status === "OK") {
			setAlertProps({
				type: "success",
				text: "Se ha enviado un mail para recuperar contraseña, por favor revise su correo electronico.",
			});
			setShowAlert(true);
		} else {
			setAlertProps({
				type: 'error',
				text: 'No se puede recuperar contraseña, por favor ingrese un email válido.',
			});
			setShowAlert(true);
			console.log(result.message);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper variant="outlined" className={classes.paper}>
				<CssBaseline/>
				<div className={classes.main}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Iniciar Sesión
					</Typography>
					<form noValidate className={classes.form} onSubmit={formik.handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Contraseña"
							type="password"
							id="password"
							autoComplete="current-password"
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary"/>}
							label="Recordarme"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={isLoading}
						>
							{!isLoading ? 'Ingresar' : <CircularProgress/>}
						</Button>
						<AlertCustom
							type={alertProps.type}
							text={alertProps.text}
							open={showAlert}
							setOpen={setShowAlert}
						/>
						<Grid container>
							<Grid alignItems="center" item xs={12}>
								<Typography align="center"> ó </Typography>
							</Grid>
							<Grid item xs={10}>
								<Typography align="right"> Ingresá con tu cuenta de Gmail</Typography>
							</Grid>
							<Grid item xs={2} style={{marginBottom: '2rem'}}>
								<Tooltip title="Google">
									<IconButton size="small" color="secondary" onClick={handleLoginWithGmail}>
										<EmailIcon/>
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid item xs={6}>
								<Link onClick={() => handleClickRecoverAndResetPassword(formik.values.email)} variant="body2" color="secondary">
									¿Olvidaste tu contraseña?
								</Link>
							</Grid>
							<Grid item>
								<Link to="/sign-up">
									<Typography variant="body2" color="secondary">
										¿No tienes cuenta? Registrate
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8}>
					<Copyright/>
				</Box>
			</Paper>
			<AlertCustom
				type={alertProps.type}
				text={alertProps.text}
				open={showAlert}
				setOpen={setShowAlert}
			/>
		</Container>
	);
};
export default Login;
