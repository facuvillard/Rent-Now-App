import React, { useEffect } from 'react'
//Material UI
import { Grid, Typography, Divider, makeStyles, Button } from "@material-ui/core";
import { withRouter } from 'react-router-dom'

//Constantes
import { tipoEspacio } from "constants/espacios/constants"

import moment from "moment"

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

    console.log(props.location.state)
    const reserva = props.location.state

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
                        <b>{reserva.complejo.nombre}</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant='subtitle2' className={classes.titulo}>
                        Espacio: {reserva.espacio.nombre}
                </Typography>
                    <Typography variant='caption' display="block" className={classes.titulo} >
                    {reserva.espacio.tipoEspacio} - {reserva.espacio.tipoPiso} - {reserva.espacio.infraestructura}
                </Typography>
                    <Typography variant='caption' display="block" className={classes.titulo} >
                        Capacidad: {reserva.espacio.capacidad} participantes
                </Typography>
                </Grid>
                <Grid item xs={6} className={classes.complejo} >
                    <img src={reserva.espacio.foto[0] ? reserva.espacio.foto[0] : tipoEspacio[reserva.espacio.tipoEspacio].urlImagen} alt="imagen-espacio" width="95%" />
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
                    {moment(reserva.fecha).format("D MMMM YYYY")} de {reserva.horarioInicio} a {reserva.horarioFin}
                </Typography>
                </ Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle1' className={classes.titulo} gutterBottom>
                        Número Telefonico del Complejo:
                </Typography>
                </Grid>
                <Grid item xs={6} >
                    <Typography variant='subtitle2' className={classes.titulo} gutterBottom>
                        {reserva.complejo.telefono}
                </Typography>
                </Grid>
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
                        {reserva.complejo.ubicacion.calle} {reserva.complejo.ubicacion.numero} - 
                        Barrio: {reserva.complejo.ubicacion.barrio} - 
                        {reserva.complejo.ubicacion.ciudad}, {reserva.complejo.ubicacion.provincia}
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

export default withRouter(ConfirmReserva)
