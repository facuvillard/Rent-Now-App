import React, { useState, useEffect, useContext } from 'react';
import {
	List, ListItem, CardActionArea,
	Card, CardMedia, CardContent,
	Typography, ListItemText, Avatar,
	Grid, Chip, IconButton, Divider,
	TextField, MenuItem, Button, makeStyles
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Autocomplete } from '@material-ui/lab';
import { tipoEspacio } from 'constants/espacios/tipoEspacio';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import EspacioImage from 'assets/FilterButtons/basketball.png'
import LocationImage from 'assets/FilterButtons/location.png'
import DialogCustom from "components/utils/DialogCustom/DialogCustom"
import { AuthContext } from 'Auth/Auth';
import { getComplejosByFilters } from 'api/complejos';
import { getProvincesApi, getCitiesByProvincesApi } from 'api/geoApi';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%',
	},
	media: {
		height: 140,
	},
	list: {
		width: '100%',
		height: '45%',
		paddingBottom: '10%',
	},
	rating: {
		display: 'flex',
		alignSelf: 'flex-end',
	},
	formControl: {
		minWidth: '100%',
	},
	AlertStyle: {
		marginLeft: '5%',
		marginRight: '5%',
	},
	fab: {
		position: 'fixed',
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
	chipSuccess: {
		backgroundColor: '#66bb6a',
		color: '#FAFAFA',
		margin: 'auto',
		marginLeft: theme.spacing(2),
	},
	container: {
		display: 'inline-flex'
	},
	chipValoracion: {
		margin: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	},
	chipCancha: {
		marginRight: theme.spacing(0.5),
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	ciudadContainer: {
		marginBottom: theme.spacing(2),
	},
	ciudadSelect: {
		width: '15em',
		margin: theme.spacing(2)
	},
	filterChip: {
		margin: theme.spacing(0.25),
		backgroundColor: '#f6f7f9'
	}
}));

function SelectTipoEspacio({ open, tiposEspacio, onClose, selectedTipo }) {
	const classes = useStyles();

	const handleClose = () => {
		onClose(selectedTipo);
	};

	const handleListItemClick = (tipo) => {
		onClose(tipo);
	};

	return (
		<DialogCustom title="Tipos de espacio " open={open} onClose={handleClose}>
			<Divider className={classes.divider} />
			<List>
				<ListItem autoFocus onClick={() => { handleListItemClick('Todos') }} button>
					<ListItemText primary='Todos' />
				</ListItem>
				{

					tiposEspacio.map((tipo, index) => {
						return (
							<ListItem autoFocus onClick={() => { handleListItemClick(tipo.value) }} button key={tipo + index}>
								<ListItemText primary={tipo.value} />
							</ListItem>
						)
					}
					)}
			</List>
		</DialogCustom>
	)
}

function SelectCiudad({ open, onClose, setProvinces, setCities, cities, provinces, selectedCiudad, selectedProvincia, setOpenSelectCiudad }) {
	const classes = useStyles();

	useEffect(() => {
		getProvincesApi().then((response) => {
			setProvinces(response.provincias);
		});
	}, [setProvinces]);

	const handleCityTextField = async (e) => {
		if (e.target.value.length > 3) {
			await getCitiesByProvincesApi(formik.values.provincia, e.target.value).then((response) => {
				setCities(response.localidades);
			});
		} else {
			setCities([]);
		}
	};

	const formik = useFormik({
		initialValues: {
			provincia: selectedProvincia,
			ciudad: selectedCiudad,
		},
		onSubmit: (values) => {
			onClose(values)
		},
	});

	return (
		<DialogCustom title="Provincia y Ciudad" open={open} onClose={() => setOpenSelectCiudad(false)}>
			<Divider className={classes.divider} />
			<form onSubmit={formik.handleSubmit}>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
					className={classes.ciudadContainer}
				>
					<Grid item xs={12}>
						<TextField
							select
							variant="outlined"
							margin="normal"
							required
							className={classes.ciudadSelect}
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
					</Grid>
					<Grid item xs={12}>
						<Autocomplete
							disabled={formik.values.provincia ? false : true}
							options={cities}
							getOptionLabel={(option) => option.nombre}
							inputValue={formik.values.ciudad}
							renderInput={(params) => (
								<TextField
									className={classes.ciudadSelect}
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
					</Grid>
					<Grid item xs={6}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Aceptar
						</Button>
					</Grid>
				</Grid>
			</form>
		</DialogCustom>
	)
}

export const ComplejosList = () => {
	const { currentUserData } = useContext(AuthContext);
	const classes = useStyles();
	const history = useHistory();
	const [complejosList, setComplejosList] = useState([]);
	const [selectedTipoEspacio, setSelectedTipoEspacio] = useState('Todos');
	const [openSelectTipoEspacio, setOpenSelectTipoEspacio] = useState(false);
	const [provinces, setProvinces] = useState([]);
	const [cities, setCities] = useState([]);
	const [selectedProvincia, setSelectedProvincia] = useState(currentUserData.provincia);
	const [selectedCiudad, setSelectedCiudad] = useState(currentUserData.ciudad);
	const [openSelectCiudad, setOpenSelectCiudad] = useState(false);

	const handleSelectTipoEspacioOpen = () => {
		setOpenSelectTipoEspacio(true)
	}

	const handleCloseSelectTipoEspacio = (value) => {
		setOpenSelectTipoEspacio(false);
		setSelectedTipoEspacio(value);
	};

	const handleSelectCiudadOpen = () => {
		setOpenSelectCiudad(true)
	}

	const handleCloseSelectedCiudad = (value) => {
		setOpenSelectCiudad(false);
		setSelectedProvincia(value.provincia)
		setSelectedCiudad(value.ciudad);
	};

	function goToComplejoDetail(idComplejo) {
		history.push(`/complejos/${idComplejo}`);
	}

	useEffect(() => {
		getComplejosByFilters({ tipoEspacio: selectedTipoEspacio, ciudad: selectedCiudad, provincia: selectedProvincia }).then(
			result => {
				setComplejosList(result.data)
			}
		);
	}, [selectedCiudad, selectedProvincia, selectedTipoEspacio]);

	return (
		<>
			<Grid>
				<Typography variant="h6" gutterBottom>
					Filtros
				</Typography>
			</Grid>
			<Grid
				direction="row"
				justifyContent="space-evenly"
				alignItems="center"
			>
				<div style={{ display: 'inline-grid', marginRight: '10px' }}>
					<IconButton><img src={EspacioImage} alt="espacio" onClick={handleSelectTipoEspacioOpen} /></IconButton>
					<Typography variant="subtitle2" gutterBottom align='center'>
						Espacio
					</Typography>
				</div>
				<div style={{ display: 'inline-grid', marginRight: '10px' }}>
					<IconButton><img src={LocationImage} alt="ciudad" onClick={handleSelectCiudadOpen} /></IconButton>
					<Typography variant="subtitle2" gutterBottom align='center'>
						Ciudad
					</Typography>
				</div>
			</Grid>
			<Divider className={classes.divider} />
			<Grid
				container
				direction="row"
				justifyContent="flex-start"
				alignItems="center"
				spacing={2}
			>
				<Chip className={classes.filterChip} color="primary" avatar={<Avatar src={EspacioImage} />} label={`Tipo de Espacio: ${selectedTipoEspacio}`} />
				<Chip className={classes.filterChip}  color="primary" avatar={<Avatar src={LocationImage} />} label={`Ciudad: ${selectedCiudad}`} />
			</Grid>
			<List className={classes.list}>
				{complejosList.length === 0 ? (
					<Grid container justify="center">
						<Alert className={classes.AlertStyle} severity="warning">
							<AlertTitle>No existen complejos con este tipo de espacio en esta ubicación</AlertTitle>
						</Alert>
					</Grid>
				) : (
					complejosList.map((complejo) => {
						let tiposEspacios = []
						return (
							<ListItem key={complejo.id}>
								<Card className={classes.root} elevation={4}>
									<CardActionArea style={{ height: '100%' }} onClick={() => goToComplejoDetail(complejo.id)}>
										<CardMedia className={classes.media} image={complejo.fotos[0]} title={complejo.nombre} />
										<CardContent>
											<Grid className={classes.container}>
												<Typography gutterBottom variant="h6" component="h2">
													{complejo.nombre}
												</Typography>
												{complejo.valoracionPromedio ? (
													<Chip
														icon={<StarBorderIcon />}
														label={complejo.valoracionPromedio.toFixed(2)}
														color="primary"
														size='small'
														className={classes.chipValoracion}
													/>
												) : (
													<Chip
														icon={<NewReleasesIcon style={{ color: '#FAFAFA', marginRight: 5 }} />}
														label={'Nuevo'}
														size='small'
														className={classes.chipSuccess}
													/>
												)}
											</Grid>
											{complejo.espaciosMetaData.map((espacio) => {
												if (tiposEspacios.includes(espacio.tipoEspacio)) {
													return null
												}
												else {
													tiposEspacios.push(espacio.tipoEspacio)
													return (
														<Chip
															label={espacio.tipoEspacio}
															color="secondary"
															size='small'
															className={classes.chipCancha}
														/>
													)
												}
											})}
										</CardContent>
									</CardActionArea>
								</Card>
							</ListItem>
						)
					})
				)}
			</List>
			<SelectTipoEspacio
				open={openSelectTipoEspacio}
				tiposEspacio={tipoEspacio}
				onClose={handleCloseSelectTipoEspacio}
				selectedTipo={selectedTipoEspacio}
			/>
			<SelectCiudad
				open={openSelectCiudad}
				cities={cities}
				setCities={setCities}
				provinces={provinces}
				setProvinces={setProvinces}
				onClose={handleCloseSelectedCiudad}
				selectedCiudad={selectedCiudad}
				selectedProvincia={selectedProvincia}
				setOpenSelectCiudad={setOpenSelectCiudad}
			/>
		</>
	);
};
