import React, { useState, useRef } from 'react'

// Material UI
import {
    Grid, Typography, Divider,
    makeStyles, TextField, Button
} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

// Routes
import { useHistory } from "react-router-dom";
import * as Routes from 'constants/routes'

// Otros
import foto from 'assets/hola.jpg'
import firebase from 'firebase';
import moment from 'moment'
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    titulo: {
        textAlign: 'center'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    tituloSeccion: {
        textAlign: 'center',
        marginBottom: theme.spacing(1)
    },
    complejo: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    paddings: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    boton: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
}));

const CreateOpinion = (props) => {
    const classes = useStyles()

    const [disabled, setDisabled] = useState(true)
    const [opinion, setOpinion] = useState({
        puntaje: 0,
        comentario: ''
    })

    const comentario = useRef('');


    const history = useHistory()

    const reserva = {
        complejo: {
            nombre: 'Complejo cerca de mi casa',
            foto: foto
        },
        espacio: {
            nombre: 'Cancha 11',
            tipoEspacio: 'Cancha de Futbol',
            tipoPiso: 'Cesped',
            infraestructura: 'Abierta'
        },
        fechaInicio: firebase.firestore.Timestamp.now(),
        fechaFin: firebase.firestore.Timestamp.now()
    }

    const handleChangeRating = (valor) => {
        setDisabled(false)
        setOpinion({ ...opinion, puntaje: valor })
    }

    const handleSubmitValoracion = () => {
        setDisabled(true)
        if (opinion.puntaje !== 0) {
            Swal.fire({
                title: '¡Opinión enviada con éxito!',
                text: 'Los demas usuarios de la aplicacion podran ver tu valoracion',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    history.push(Routes.COMPLEJOS);
                }
            })
        }
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
                        Compartí tu opinión
                </Typography>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={12} md={6} className={classes.complejo} >
                    <img src={reserva.complejo.foto} alt="imagen-espacio" width="100%" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='subtitle1' className={classes.tituloSeccion} gutterBottom>
                        <b>{reserva.complejo.nombre}</b>
                    </Typography>
                    <Typography variant='subtitle2' className={classes.titulo}>
                        Espacio: {reserva.espacio.nombre}
                    </Typography>
                    <Typography variant='caption' display="block" className={classes.titulo} >
                        {reserva.espacio.tipoEspacio} - {reserva.espacio.tipoPiso} - {reserva.espacio.infraestructura}
                    </Typography>
                    <Typography variant='subtitle2' className={classes.titulo} gutterBottom>
                        Fecha:{moment(reserva.fechaInicio.toDate()).format("DD/MM/YYYY")} de {moment(reserva.fechaInicio.toDate()).format("HH:mm")} a {moment(reserva.fechaFin.toDate()).format("HH:mm")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                <Grid item xs={12} className={classes.paddings}>
                    <Typography variant='subtitle1' gutterBottom>
                        Puntaje
                    </Typography>
                    <Typography variant='caption' display="block" >
                        Servicio, Calidad y Condiciones del Espacio
                    </Typography>
                    <Rating
                        id="puntaje"
                        name="puntaje"
                        size="large"
                        onChange={(_, newValue) => handleChangeRating(newValue)}
                    />
                </Grid>
                <Grid item xs={12} className={classes.paddings}>
                    <TextField
                        id="comentario"
                        name="comentario"
                        label="¿Querés agregar un comentario?"
                        multiline
                        fullWidth
                        rowsMax={4}
                        defaultValue=""
                        inputRef={comentario}
                    />
                </Grid>
                <Grid item xs={3} className={classes.boton}>
                    <Button
                        disabled={disabled ? true : false}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setOpinion({ ...opinion, comentario: comentario.current.value })
                            handleSubmitValoracion()
                        }}
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateOpinion
