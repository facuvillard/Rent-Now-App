import React, { useState, useEffect } from 'react';

// Api services
import { getProvincesApi, getCitiesByProvincesApi } from 'api/geoApi';
import { signUpWithEmailApi } from 'api/auth';

// Material-ui Components and Icons
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

// Autocomplete
import { Autocomplete } from '@material-ui/lab';
import { PersonOutline } from '@material-ui/icons';

// Formik
import { useFormik } from 'formik';

// Moment
import moment from 'moment';
import 'moment/locale/es';

import AlertCustom from '../utils/AlertCustom/AlertCustom';

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

export default function RegisterUser(props) {
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const [alertProps, setAlertProps] = useState({});
	const [alertShow, setAlertShow] = useState(false);

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
			setIsLoading(true);
			signUpWithEmailApi(values)
				.then((resp) => {
					if (resp.status === 'ERROR') {
						setIsLoading(false);
						setAlertProps({
							text: resp.message,
							type: 'error',
						});
						setAlertShow(true);
					} else {
						window.location.replace('/complejos');
					}
				})
				.catch(() => {
					setIsLoading(false);
					setAlertProps({
						text: 'Error al registrar usuario',
						type: 'error',
					});
					setAlertShow(true);
				});
		},
	});

	useEffect(() => {
		getProvincesApi().then((response) => {
			setProvinces(response.provincias);
		});
	}, []);

	const handleCityTextField = async (e) => {
		if (e.target.value.length > 3) {
			await getCitiesByProvincesApi(formik.values.provincia, e.target.value).then((response) => {
				setCities(response.localidades);
			});
		} else {
			setCities([]);
		}
	};

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
					<form className={classes.form} onSubmit={formik.handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							autoFocus
							label="Nombre"
							name="nombre"
							autoComplete="nombre"
							value={formik.values.nombre}
							onChange={formik.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Apellido"
							name="apellido"
							autoComplete="apellido"
							value={formik.values.apellido}
							onChange={formik.handleChange}
						/>
						<TextField
							type="number"
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Celular"
							name="celular"
							autoComplete="celular"
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
							label="Fecha de Nacimiento"
							name="fechaNacimiento"
							autoComplete="fechaNacimiento"
							value={formik.values.fechaNacimiento}
							onChange={formik.handleChange}
						/>
						<TextField
							select
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Provincia"
							name="provincia"
							autoComplete="provincia"
							value={formik.values.provincia}
							onChange={(e) => {
								formik.handleChange(e);
								formik.setFieldValue('ciudad', '');
							}}
						>
							{provinces.map((opt) => (
								<MenuItem key={opt.id} value={opt.nombre}>
									{opt.nombre}
								</MenuItem>
							))}
						</TextField>
						<Autocomplete
							disabled={formik.values.provincia ? false : true}
							options={cities}
							getOptionLabel={(option) => option.nombre}
							inputValue={formik.values.ciudad}
							renderInput={(params) => (
								<TextField
									{...params}
									margin="normal"
									name="ciudad"
									label="Ciudad"
									variant="outlined"
									required
									onChange={handleCityTextField}
								/>
							)}
							onInputChange={(e, inputValue) => {
								formik.setValues({ ...formik.values, ciudad: inputValue });
							}}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label="Email"
							name="email"
							autoComplete="email"
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
							autoComplete="current-password"
							value={formik.values.password}
							onChange={formik.handleChange}
						/>
						<AlertCustom
							type={alertProps.type}
							text={alertProps.text}
							open={alertShow}
							setOpen={setAlertShow}
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
