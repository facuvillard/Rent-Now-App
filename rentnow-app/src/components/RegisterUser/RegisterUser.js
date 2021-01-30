import React, { useState } from 'react';
import {
	Container,
	CssBaseline,
	Paper,
	Avatar,
	makeStyles,
	Typography,
	TextField,
	MenuItem,
	Button,
	CircularProgress,
} from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';
import { useFormik } from 'formik';
import moment from 'moment';
import 'moment/locale/es';

const provincia = [
	{
		value: 'Cordoba',
		label: 'Córdoba',
	},
	{
		value: 'La Rioja',
		label: 'La Rioja',
	},
];
const ciudad = [
	{
		value: 'Cordoba',
		label: 'Córdoba',
	},
	{
		value: 'La Rioja',
		label: 'La Rioja',
	},
];

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

export default function RegisterUser() {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			celular: '',
			email: '',
			fechaNacimiento: moment(new Date()).format('yyyy-MM-DD'),
			provincia: '',
			ciudad: '',
			password: '',
		},
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<Container component="main" maxWidth="xs">
			<Paper variant="outlined" className={classes.paper}>
				<CssBaseline />
				<div className={classes.main}>
					<Avatar className={classes.avatar}>
						<PersonOutline />
					</Avatar>
					<Typography component="h1" variant="h5">
						¡Registrate con tus datos!
					</Typography>
					<form noValidate className={classes.form}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="nombre"
							label="Nombre"
							name="nombre"
							autoComplete="nombre"
							autoFocus
							value={formik.values.nombre}
							onChange={formik.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="apellido"
							label="Apellido"
							name="apellido"
							autoComplete="apellido"
							autoFocus
							value={formik.values.apellido}
							onChange={formik.handleChange}
						/>
						<TextField
							type="number"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="celular"
							label="Celular"
							name="celular"
							autoComplete="celular"
							autoFocus
							value={formik.values.celular}
							onChange={formik.handleChange}
						/>
						<TextField
							type="date"
							inputProps={{ max: moment(new Date()).format('yyyy-MM-DD') }}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="fechaNacimiento"
							label="Fecha de Nacimiento"
							name="fechaNacimiento"
							autoComplete="fechaNacimiento"
							autoFocus
							value={formik.values.fechaNacimiento}
							onChange={formik.handleChange}
						/>
						<TextField
							select
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="provincia"
							label="Provincia"
							name="provincia"
							autoComplete="provincia"
							autoFocus
							value={formik.values.provincia}
							onChange={formik.handleChange}
						>
							{provincia.map((opt) => (
								<MenuItem key={opt.value} value={opt.value}>
									{opt.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							select
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="ciudad"
							label="Ciudad"
							name="ciudad"
							autoComplete="ciudad"
							autoFocus
							value={formik.values.ciudad}
							onChange={formik.handleChange}
						>
							{ciudad.map((opt) => (
								<MenuItem key={opt.value} value={opt.value}>
									{opt.label}
								</MenuItem>
							))}
						</TextField>
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
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={isLoading}
						>
							{!isLoading ? 'Registrar' : <CircularProgress />}
						</Button>
					</form>
				</div>
			</Paper>
		</Container>
	);
}
