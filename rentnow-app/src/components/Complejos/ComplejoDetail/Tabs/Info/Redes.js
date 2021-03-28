import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Link, Card, CardContent } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

// ICONOS
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
    tituloSeccion: {
        textAlign: 'center'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
}))

const Redes = (props) => {
    const classes = useStyles();
    return (
        <>
            {
                props.redes.facebook !== ''
                    && props.redes.twitter !== ''
                    && props.redes.instagram !== '' ? (
                    <>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    {props.redes.facebook !== '' ? (
                                        <Link color='secondary' display="block" target="_blank" variant="body1" href={props.redes.facebook}>
                                            <Grid container direction="row" spacing={1} alignItems="center">
                                                <Grid item>
                                                    <FacebookIcon />
                                                </Grid>
                                                <Grid item>Facebook</Grid>
                                            </Grid>
                                        </Link>) : null}
                                    {props.redes.twitter !== '' ? (
                                        <Link color='secondary' display="block" target="_blank" variant="body1" href={props.redes.twitter}>
                                            <Grid container direction="row" spacing={1} alignItems="center">
                                                <Grid item>
                                                    <TwitterIcon />
                                                </Grid>
                                                <Grid item>Twitter</Grid>
                                            </Grid>
                                        </Link>) : null}
                                    {props.redes.instagram !== '' ? (
                                        <Link color='secondary' display="block" variant="body1" target="_blank" href={props.redes.instagram}>
                                            <Grid container direction="row" spacing={1} alignItems="center">
                                                <Grid item>
                                                    <InstagramIcon />
                                                </Grid>
                                                <Grid item>Instagram</Grid>
                                            </Grid>
                                        </Link>) : null}
                                </CardContent>
                            </Card>
                        </Grid>
                    </>
                ) : (
                    <Grid container direction="column" alignItems="center">
                        <Alert severity="info">
                            <AlertTitle>INFO</AlertTitle>
                            ¡El complejo no tiene Redes Sociales cargadas!
                        </Alert>
                    </Grid>
                )
            }
        </>
    )
}

export default Redes
