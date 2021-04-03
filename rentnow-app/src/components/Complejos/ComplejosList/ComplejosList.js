import React from 'react'
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
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

export const ComplejosList = ({ complejos }) => {
    const classes = useStyles();
    const history = useHistory();

    function goToComplejoDetail(idComplejo) {
        history.push(`/complejos/${idComplejo}`)
    }

    return (
        <GridList className={classes.gridList} cellHeight={200} cols={1}>
            {complejos.map((complejo) => (
                <GridListTile key={complejo.id} >
                    <img src={complejo.fotos[0]} alt={complejos.nombre} />
                    <GridListTileBar
                        title={complejo.nombre}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            <IconButton aria-label={`view ${complejo.nombre}`} onClick={() => goToComplejoDetail(complejo.id)}>
                                <ArrowForwardIcon className={classes.title} />
                            </IconButton>
                        }
                    />
                </GridListTile>
            ))}
        </GridList>

    );
}
