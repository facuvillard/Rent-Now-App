import React from 'react'
//Material UI
import { Grid, Typography, Divider, makeStyles, Button } from "@material-ui/core";
import Image from 'assets/hola.jpg'

const useStyles = makeStyles((theme) => ({
    titulo: {
        textAlign: 'center'
    },
    tituloSeccion: {
        textAlign: 'center',
        marginBottom: theme.spacing(1)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    complejo: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    }
}));

const ConfirmReserva = (props) => {
    console.log(props)
    const classes = useStyles();
    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Grid item xs={12}>
                    <Typography className={classes.titulo} variant="h5" gutterBottom>
                        Confirmá tu Reserva
                </Typography>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subtitle1' className={classes.tituloSeccion} gutterBottom>
                        <b>Complejo Cerca de Mi Casa</b>
                </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant='subtitle2' className={classes.titulo}>
                        Espacio: Padel 6
                </Typography>
                    <Typography variant='caption' display="block" className={classes.titulo} >
                        Cancha Basquet - Cemento - Abierta sin luz
                </Typography>
                    <Typography variant='caption' display="block" className={classes.titulo} >
                        Capacidad: 10 participantes
                </Typography>
                </Grid>
                <Grid item xs={6} className={classes.complejo} >
                    <img src={Image} alt="imagen-espacio" width="95%" />
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle1' className={classes.titulo} gutterBottom>
                        Fecha:
                </Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography variant='subtitle2' className={classes.titulo} gutterBottom>
                        Jueves 22 Abril 15:00 - 17:00
                </Typography>
                </ Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle1' className={classes.titulo} gutterBottom>
                        Dirección:
                </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant='subtitle2' className={classes.titulo} gutterBottom>
                        Lagunilla, 2321 Cordoba, Cordoba
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle1' className={classes.titulo} gutterBottom>
                        Precio:
                </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant='subtitle2' className={classes.titulo} gutterBottom>
                        $200
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle1' className={classes.titulo} gutterBottom>
                        Metodo de Pago:
                </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant='subtitle2' className={classes.titulo} gutterBottom>
                        En el Local
                </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Button size="medium" variant="contained" color="primary">
                    Confirmar
                                        </Button>
            </Grid>
        </>
    )
}

export default ConfirmReserva
