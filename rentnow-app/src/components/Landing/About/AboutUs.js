import React from 'react'
import { Container, makeStyles, Grid, Typography, Button, useMediaQuery, useTheme } from '@material-ui/core'
import ContactIcon from '@material-ui/icons/ContactMailOutlined';
import AboutImg from 'assets/Landing/logo-amarillo.png'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#FAFAFE',
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
        backgroundImage: `url(${AboutImg})`,
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "500px",
        height: "100%",
        width: "100%",
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

const AboutUs = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const classes = useStyles();
    return (
        <section className={classes.root} >
            <Container className={classes.container}>
                <Grid container spacing={5}>
                    {matches ? (<Grid item xs={12} md={6} className={classes.image}></Grid>) : (null)}
                    <Grid item xs={12} md={6}>
                        <div className={classes.item}>
                            <Typography variant="h4" marked="center" align="center" className={classes.title}>
                                <b>SOBRE NOSOTROS</b>
                                <span className={classes.subrayado} />
                            </Typography>
                            <Typography align="center" className={classes.title}>
                                {'Nosotros somos Rent Now, 4 chicos de Córdoba inspirados en utilizar la tecnología para facilitarnos la vida.'}
                                <br></br>
                                {'¿Sentís que no encuentras donde jugar? ¿Estás cansado de llamar por telefono? ¿Te gustaría conocer nuevos complejos?'}
                                <br></br>
                                {'¡Estás en la página correcta! Con Rent Now ya no es necesario llamar por teléfono, ni pasar horas buscando donde jugar.'}
                                {' Aquí podrás organizar tus turnos, estar pendiente de las mejores promociones, y los mejores complejos valorados por los propios usuarios. '}
                                {'Con Rent Now tus días serán mucho más fáciles.'}

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
                </Grid>
            </Container>
        </section >
    )
}

export default AboutUs