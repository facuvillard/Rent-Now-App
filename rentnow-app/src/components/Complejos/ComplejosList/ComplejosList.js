import React, { useState, useEffect } from 'react';
import {
	List,
	ListItem,
	CardActionArea,
	Card,
	CardMedia,
	CardContent,
	Typography,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Rating, Alert, AlertTitle } from '@material-ui/lab';

import { tipoEspacio } from 'constants/espacios/tipoEspacio';

const useStyles = makeStyles({
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
});

export const ComplejosList = ({ complejos }) => {
	const classes = useStyles();
	const history = useHistory();
	const [tipoEspacioSelected, setTipoEspacioSelected] = useState('Todos');
	const [complejosList, setComplejosList] = useState([]);

	function goToComplejoDetail(idComplejo) {
		history.push(`/complejos/${idComplejo}`);
	}

	useEffect(() => {
		if (tipoEspacioSelected === 'Todos') {
			setComplejosList(complejos);
		} else {
			const filtro = complejos.filter((com) =>
				com.espaciosMetaData.some((esp) => esp.tipoEspacio === tipoEspacioSelected)
			);
			setComplejosList(filtro);
		}
	}, [tipoEspacioSelected]);

	return (
		<List className={classes.list}>
			<ListItem>
				<FormControl className={classes.formControl}>
					<InputLabel id="tipoEspacio">Tipo de espacio</InputLabel>
					<Select
						variant="outlined"
						labelId="tipoEspacio"
						id="tipoEspacioSelect"
						value={tipoEspacioSelected}
						onChange={(e) => setTipoEspacioSelected(e.target.value)}
					>
						<MenuItem value={'Todos'}>Todos</MenuItem>
						{tipoEspacio.map((te) => (
							<MenuItem value={te.value}>{te.key}</MenuItem>
						))}
					</Select>
				</FormControl>
			</ListItem>
			{complejos.length === 0 ? (
				<Grid container justify="center">
					<Alert className={classes.AlertStyle} severity="warning">
						<AlertTitle>No existen complejos en esta ubicación</AlertTitle>
					</Alert>
				</Grid>
			) : complejosList.length === 0 ? (
				<Grid container justify="center">
					<Alert className={classes.AlertStyle} severity="warning">
						<AlertTitle>No existen complejos con este tipo de espacio en esta ubicación</AlertTitle>
					</Alert>
				</Grid>
			) : (
				complejosList.map((complejo) => (
					<ListItem key={complejo.id}>
						<Card className={classes.root} elevation={4}>
							<CardActionArea style={{ height: '100%' }} onClick={() => goToComplejoDetail(complejo.id)}>
								<CardMedia className={classes.media} image={complejo.fotos[0]} title={complejo.nombre} />
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										{complejo.nombre}
									</Typography>
									<Rating defaultValue={3} size="large" precision={1} readOnly />
								</CardContent>
							</CardActionArea>
						</Card>
					</ListItem>
				))
			)}
		</List>
	);
};
