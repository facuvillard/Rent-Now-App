import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import { Card, CardHeader, CardMedia, Avatar } from '@material-ui/core';

import logo from "assets/Landing/logo-amarillo-simple.png"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
    avatar : {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: theme.palette.secondary.dark,
    } 
}));

export default function ComplejoInfoWindow(props) {
	const { complejo } = props;
	const classes = useStyles();
	const position = {
		lat: complejo.ubicacion.latlng.latitude,
		lng: complejo.ubicacion.latlng.longitude,
	};

	console.log(complejo);

	const onCloseClickHandler = () => {
		props.setComplejo(null);
	};
	return (
		<InfoWindow onCloseClick={onCloseClickHandler} position={position}>
			<Card className={classes.root}>
				<CardHeader
					avatar={
						<Avatar className={classes.avatar} src={logo}  />

					}
					titleTypographyProps={{variant: "h5"} }
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
			</Card>
		</InfoWindow>
	);
}
