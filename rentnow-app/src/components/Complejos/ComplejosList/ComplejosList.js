import React from 'react'
import { GridList, GridListTile, GridListTileBar, IconButton, List, ListItem, CardActionArea, Card, CardMedia, CardContent, Typography, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom'
import { Rating } from '@material-ui/lab';


/* const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "100%",
        height: "100%",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
    },
}));
 */

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        width: "100%",
        height: "100%"
    },
    media: {
      height: "74%",
    },
    list: {
        width: "100%",
        height: "100%",
    },
    rating: {
        display: 'flex',
        alignSelf: "flex-end"
    }
  });

export const ComplejosList = ({ complejos }) => {
    const classes = useStyles();
    const history = useHistory();

    function goToComplejoDetail(idComplejo) {
        history.push(`/complejos/${idComplejo}`)
    }

    return (
        <List className={classes.list}>
            <FormControl>
                <InputLabel id="tipoComplejo">Tipo de complejo</InputLabel>
                <Select
                labelId="tipoComplejo"
                id="tipoComplejoSelect"
                value={12}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>                    
                    <MenuItem value={12}>12</MenuItem>
                </Select>
            </FormControl>
            {complejos.map((complejo => (
                <ListItem className={classes.root} key={complejo.id}>
                    <Card className={classes.root} elevation={4} >
                        <CardActionArea onClick={() => goToComplejoDetail(complejo.id)}>
                            <CardMedia
                            className={classes.media}
                            image={complejo.fotos[0]}
                            title={complejo.nombre}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {complejo.nombre}
                                </Typography>
					            <Rating defaultValue={3} size="large" precision={1} readOnly/>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </ListItem>
            )))
            }
        </List>
    );
}
