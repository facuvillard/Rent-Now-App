import React from 'react';
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
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import Link from 'utils/LinkCustom/Link';

import logo from 'assets/Landing/logo-amarillo-simple.png';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function ComplejoInfoWindow(props) {
	const { complejo } = props;
	const classes = useStyles();
	const position = {
		lat: complejo.ubicacion.latlng.latitude,
		lng: complejo.ubicacion.latlng.longitude,
	};
	const onCloseClickHandler = () => {
		props.setComplejo(null);
	};
	return (
		<InfoWindow onCloseClick={onCloseClickHandler} position={position}>
			<Card elevation={4}>
				<CardHeader
					avatar={<Avatar className={classes.avatar} src={logo} />}
					titleTypographyProps={{ variant: 'h6' }}
					subheaderTypographyProps="h3"
					title={complejo.nombre}
					subheader={
						complejo.ubicacion.calle +
						' ' +
						complejo.ubicacion.numero +
						', ' +
						complejo.ubicacion.ciudad +
						'.'
					}
				/>
				<CardMedia className={classes.media} image={complejo.fotos[0]} title="Imagen complejo" />
				<CardContent>
					<Typography component="legend">Valoración:</Typography>
					<Rating defaultValue={3} size="large" precision={1} readOnly />
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
