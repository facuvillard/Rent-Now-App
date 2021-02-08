import React from 'react'
import { Container, makeStyles, Grid, Typography, Button } from '@material-ui/core'
import registerImage from 'assets/Landing/registerImage.png'
import calendarImage from 'assets/Landing/calendarImage.png'
import checkImage from 'assets/Landing/checkImage.png'
import filterImage from 'assets/Landing/filtrarImage.png'
import fondoImage from 'assets/Landing/fondoImage.png'

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
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 100,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    imagenFondo: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        opacity: 0.20,
        backgroundRepeat: "repeat-y",
    },
    number: {
        fontSize: 25,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.secondary.dark,
        fontWeight: theme.typography.fontWeightMedium,
    },
    subrayado: {
        height: 5,
        width: 100,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        background: "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
    },
    button: {
        marginTop: theme.spacing(6),
        color: "#424242"
    },
}))

const HowItWorks = () => {
    const classes = useStyles()
    return (
        <section id="HowItWorks" className={classes.root}>
            <Container className={classes.container}>
                <img
                    src={fondoImage}
                    className={classes.imagenFondo}
                    alt=""
                />
                <Typography variant="h4" marked="center" align="center" className={classes.title} component="h2">
                    <b>¿CÓMO FUNCIONA?</b>
                    <span className={classes.subrayado} />
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    src={registerImage}
                                    alt="registrate"
                                    className={classes.image}
                                />
                                <Typography variant="h5" className={classes.title} align="center">
                                    <b>1. REGISTRATE</b>
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {'¡Entra a www. y registrate para poder usar nuestro sitio!'}
                                </Typography>
                                <Button color="primary" size="large" variant="contained" className={classes.button} href="/login"><b>Registrarme</b></Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    src={filterImage}
                                    alt="filtraTuEspacio"
                                    className={classes.image}
                                />
                                <Typography variant="h5" className={classes.title} align="center">
                                    <b>2. FILTRÁ TU ESPACIO</b>
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {'Podrás elegir diferentes condiciones que quieras que tenga tu espacio, o buscarlo directamente por el nombre.'}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>
                                <img
                                    src={calendarImage}
                                    alt="reserva"
                                    className={classes.image}
                                />
                                <Typography variant="h5" className={classes.title} align="center">
                                    <b>3. RESERVÁ UN TURNO</b>
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {'Seleccioná fecha y horario para jugar.'}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.item}>

                                <img
                                    src={checkImage}
                                    alt="listo"
                                    className={classes.image}
                                />
                                <Typography variant="h5" className={classes.title} align="center">
                                    <b>4. ¡LISTO!</b>
                                </Typography>
                                <Typography variant="h6" align="center">
                                    {'Espera el mail confirmando tu turno y listo, ¡ya puedes ir a jugar!'}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    )
}

export default HowItWorks
