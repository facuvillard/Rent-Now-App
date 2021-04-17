import React from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Rating } from '@material-ui/lab';

import { tipoEspacio } from 'constants/espacios/tipoEspacio';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '100%',
		height: '100%',
	},
	media: {
		height: '74%',
	},
	list: {
		width: '100%',
		height: '100%',
	},
	rating: {
		display: 'flex',
		alignSelf: 'flex-end',
	},
	formControl: {
		minWidth: '50%',
	},
});

export const ComplejosList = ({ complejos }) => {
	const classes = useStyles();
	const history = useHistory();

	function goToComplejoDetail(idComplejo) {
		history.push(`/complejos/${idComplejo}`);
	}

	return (
		<List className={classes.list}>
			<ListItem>
				<FormControl className={classes.formControl}>
					<InputLabel id="tipoEspacio">Tipo de espacio</InputLabel>
					<Select variant="outlined" labelId="tipoEspacio" id="tipoEspacioSelect">
						<MenuItem value={'Todos'}>Todos</MenuItem>
						{tipoEspacio.map((te) => (
							<MenuItem value={te.value}>{te.key}</MenuItem>
						))}
					</Select>
				</FormControl>
			</ListItem>
			{complejos.map((complejo) => (
				<ListItem className={classes.root} key={complejo.id}>
					<Card className={classes.root} elevation={4}>
						<CardActionArea onClick={() => goToComplejoDetail(complejo.id)}>
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
			))}
		</List>
	);
};
