import React, { useEffect, useContext, useState } from 'react'
//Material UI
import { Grid, Typography, Divider, makeStyles, Button, CircularProgress } from "@material-ui/core";
import { withRouter } from 'react-router-dom'

//Constantes
import { tipoEspacio } from "constants/espacios/constants"

// moment
import moment from "moment"

// APIS
import { createReserva } from 'api/reservas'

import Swal from 'sweetalert2'

import { AuthContext } from 'Auth/Auth'

import { useHistory } from "react-router-dom";

import * as Routes from 'constants/routes'

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
    const history = useHistory();

    const [reservaToSave, setReservaToSave] = useState(null)
    const [bottonDisabled, setBottonDisabled] = useState(false)
    const reserva = props.location.state

    const classes = useStyles();

    const { currentUser, currentUserData } = useContext(AuthContext);

    useEffect(() => {
        console.log(currentUser)
        const horarioInicio = reserva.horarioInicio.split(':')
        const horarioFin = reserva.horarioFin.split(':')
        const duracion = reserva.duracion.replace(':', ".")
        const numberDuracion = duracion.replace('3', '5')

        setReservaToSave(
            {
                cliente: {
                    id: currentUser.uid,
                    apellido: currentUserData.apellido,
                    nombre: currentUserData.nombre,
                    email: currentUserData.email,
                    celular: currentUserData.celular,
                    cantidadCreadas: currentUserData.cantidadCreadas,
                    cantidadSinConcurrencia: currentUserData.cantidadSinConcurrencia 
                },
                espacio: {
                    id: reserva.espacio.id,
                    descripcion: reserva.espacio.nombre,
                    tipoEspacio: reserva.espacio.tipoEspacio,
                    foto: reserva.espacio.foto[0] ? reserva.espacio.foto[0] : ""
                },
                complejo: {
                    id: reserva.idComplejo,
                    foto: reserva.complejo.fotos[0],
                    ubicacion: `${reserva.complejo.ubicacion.calle} ${reserva.complejo.ubicacion.numero}, Barrio: ${reserva.complejo.ubicacion.barrio}, ${reserva.complejo.ubicacion.ciudad}`,
                    nombre: reserva.complejo.nombre,
                    tiempoVencimiento: reserva.complejo?.parametrosReserva?.tiempoVencimiento || 12
                },
                estaPagado: false,
                estados: [],
                monto: reserva.espacio.precioTurno * numberDuracion,
                esFijo: false,
                reservaApp: true,
                fechaInicio: (moment(reserva.fecha, 'DD/MM/YYYY').set({ 'hours': horarioInicio[0], 'minutes': horarioInicio[1] })).toString(),
                fechaFin: (moment(reserva.fecha, 'DD/MM/YYYY').set({ 'hours': horarioFin[0], 'minutes': horarioFin[1] })).toString(),
            }
        )
    }, [currentUser, reserva])

    const handleCreateReserva = () => {
        async function createReservaFunction(reserva) {
            const result = await createReserva(reserva)
            if (result.status === "OK") {
                if (result.data.horarioDisponible === true) {
                    Swal.fire({
                        title: '¡Reserva Realizada!',
                        text: 'Reserva realizada con éxito, esperá a que el complejo confirme tu reserva',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            history.push(Routes.CONSULTAR_RESERVAS, history.location.pathname);
                        }
                    })
                }
                else {
                    Swal.fire({
                        title: '¡Error al registrar la Reserva!',
                        text: 'Prueba de nuevo mas tarde',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false
                    }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            history.push(`/complejos/${reserva.idComplejo}`, history.location.pathname);
                        }
                    })
                }
            } else {
                alert(result.message)
            }
        }
        setBottonDisabled(true)
        createReservaFunction(reservaToSave)
    }

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
                        {moment(reserva.fecha, 'DD/MM/YYYY').format("D MMMM YYYY")} de {reserva.horarioInicio} a {reserva.horarioFin}
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
                        $ {reservaToSave ? reservaToSave.monto : null}
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
                <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    disabled={bottonDisabled ? true : false}
                    onClick={() => { handleCreateReserva() }}
                >
                    {bottonDisabled ? <CircularProgress />:'Confirmar'}
                                        </Button>
            </Grid>
        </>
    )
}

export default withRouter(ConfirmReserva)
