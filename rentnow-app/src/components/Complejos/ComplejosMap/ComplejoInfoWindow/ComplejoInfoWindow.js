import React, { useEffect, useState } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import {
	Card,
	CardHeader,
	CardMedia,
	Avatar,
	CardContent,
	CardActions,
	Button,
	Typography,
	Chip
} from '@material-ui/core';
import Link from 'utils/LinkCustom/Link';

import logo from 'assets/Landing/logo-amarillo-simple.png';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		backgroundColor: theme.palette.secondary.dark,
	},
	cardActions: {
		display: "flex",
		justifyContent: 'center',
	},
	chipCancha: {
		marginRight: theme.spacing(0.5),
		marginTop: theme.spacing(1),
	},
	chipValoracion: {
		margin: 'auto',
		marginTop: theme.spacing(1),
	},
	chipSuccess: {
		backgroundColor: '#66bb6a',
		color: '#FAFAFA',
		margin: 'auto',
		marginLeft: theme.spacing(2),
	},
}));

export default function ComplejoInfoWindow(props) {
	const { complejo } = props;
	const [tiposEspacios, setTiposEspacios] = useState(null)
	const classes = useStyles();
	const position = {
		lat: complejo.ubicacion.latlng.latitude,
		lng: complejo.ubicacion.latlng.longitude,
	};

	const onCloseClickHandler = () => {
		props.setComplejo(null);
	};

	useEffect(() => {
		let aux = []
		complejo.espaciosMetaData.forEach((espacio) => {
			if (aux.includes(espacio.tipoEspacio)) {
				return
			}
			else {
				aux.push(espacio.tipoEspacio)
			}
		})
		setTiposEspacios(aux)
	}, [complejo])

	return (
		<InfoWindow onCloseClick={onCloseClickHandler} position={position}>
			<Card elevation={4}>
				<CardHeader
					avatar={<Avatar className={classes.avatar} src={logo} />}
					titleTypographyProps={{ variant: 'h6' }}
					subheaderTypographyProps="h3"
					title={complejo.nombre}
					subheader={
						complejo.valoracionPromedio ? (
							<Chip
								icon={<StarBorderIcon />}
								label={complejo.valoracionPromedio.toFixed(2)}
								color="primary"
								size='small'
								className={classes.chipValoracion}
							/>
						) : (
							<Chip
								icon={<NewReleasesIcon style={{ color: '#FAFAFA' }} />}
								label={'Nuevo'}
								size='small'
								className={classes.chipSuccess}
							/>
						)
					}
				/>
				<CardMedia className={classes.media} image={complejo.fotos[0]} title="Imagen complejo" />
				<CardContent>
					<div>
						<Typography component="legend"><strong>Dirección:</strong> {complejo.ubicacion.calle} {complejo.ubicacion.numero}, {complejo.ubicacion.barrio}, {complejo.ubicacion.ciudad.charAt(0) + (complejo.ubicacion.ciudad.slice(1)).toLowerCase()}  </Typography>
						{tiposEspacios && tiposEspacios.map((tipoEspacio) => (
							<Chip
								key={tipoEspacio}
								label={tipoEspacio}
								color="secondary"
								size='small'
								className={classes.chipCancha}
							/>
						))}
					</div>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Link fullWidth to={`/complejos/${complejo.id}`}>
						<Button color="primary" variant="contained" fullWidth>
							Ingresar
						</Button>
					</Link>
				</CardActions>
			</Card>
		</InfoWindow>
	);
}
