import React from 'react'
import { Container, makeStyles, Grid, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core'
import ContactIcon from '@material-ui/icons/ContactMailOutlined';
import imagenFondo from 'assets/Landing/fondoImage.png'
import estadisticasImage from 'assets/Landing/estadisticasImage.png'
import deportistaImage from 'assets/Landing/deportistaImage.png'
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        height: 100,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    itemRight: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
        borderLeft: '2px solid gray',
        height: '320px',
    },
    itemLeft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    imagenFondo: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        opacity: 0.20,
        backgroundRepeat: "repeat-y",
    },
    title: {
        marginBottom: theme.spacing(5),
    },
    subrayado: {
        height: 5,
        width: 100,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        background: "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
    },


}))

const Aplications = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const classes = useStyles();

    return (
        <section className={classes.root} >
            <Container className={classes.container}>
                <img
                    src={imagenFondo}
                    className={classes.imagenFondo}
                    alt=""
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.itemLeft}>
                            <Typography variant="h4" marked="center" align="center" className={classes.title}>
                                <b>PARA DEPORTISTAS</b>
                                <span className={classes.subrayado} />
                            </Typography>
                            <img
                                src={deportistaImage}
                                alt="deportista"
                                className={classes.image}
                            />
                            <Typography align="center" className={classes.title}>
                                Reservá los mejores espacios deportivos de tu ciudad en un instante
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<ContactIcon />}
                                href=""
                            >
                                <b>Registrate</b>
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {matches ? (
                            <div className={classes.itemRight}>
                                <Typography variant="h4" marked="center" align="center" className={classes.title}>
                                    <b>PARA COMPLEJOS</b>
                                    <span className={classes.subrayado} />
                                </Typography>
                                <img
                                    src={estadisticasImage}
                                    alt="estadisticas"
                                    className={classes.image}
                                />
                                <Typography align="center" className={classes.title}>
                                    Administrá tu complejo de forma simple y rápida
                            </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={ <ArrowRightAlt /> }
                                    href=""
                                >
                                    <b>Ingresa aquí</b>
                                </Button>
                            </div>

                        ) : (
                                <div className={classes.itemLeft}>
                                    <Typography variant="h4" marked="center" align="center" className={classes.title}>
                                        <b>PARA COMPLEJOS</b>
                                        <span className={classes.subrayado} />
                                    </Typography>
                                    <img
                                        src={estadisticasImage}
                                        alt="estadisticas"
                                        className={classes.image}
                                    />
                                    <Typography align="center" className={classes.title}>
                                        Administrá tu complejo de forma simple y rápida
                            </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={ <ArrowRightAlt /> }
                                        href=""
                                    >
                                        <b>Ingresa aquí</b>
                                    </Button>
                                </div>
                            )}
                    </Grid>
                </Grid>
            </Container>
        </section >
    )
}

export default Aplications