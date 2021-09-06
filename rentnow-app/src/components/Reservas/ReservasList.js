import React, { useState, useEffect, useContext } from 'react'

// Material UI
import {
    Grid, Typography, Divider,
    makeStyles, Card, CardContent, CardMedia, Tooltip,
    Chip, Stepper, Step, StepLabel, CircularProgress, CardHeader
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

// Moment
import moment from "moment"

// APIS
import { getReservas } from 'api/reservas';
import { getComplejoNameImagesAndUbicacion } from 'api/complejos';

// Constantes
import { colorsByEstado } from 'constants/reservas/constants'
import { tipoEspacio } from "constants/espacios/constants"

// Componentes Genericos
import DialogCustom from "components/utils/DialogCustom/DialogCustom"
import LinkCustom from 'utils/LinkCustom/Link'

// Auth
import { AuthContext } from 'Auth/Auth'

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
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 150,
    },
    root: {
        display: 'flex',
    },
    chip: {
        backgroundColor: '#F9F6A2',
        "&:hover, &:focus": {
            backgroundColor: "#F7F48B",
            cursor: "pointer",
        }
    },
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardMedia: {
        paddingTop: '60%',
        backgroundSize: 'auto'
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function ReservaDetail({ open, reserva, onClose }) {
    return (
        <DialogCustom title="Detalle de Reserva" open={open} onClose={onClose}>
            <Grid>
                <Stepper activeStep={reserva.estados.length - 1} orientation="vertical">
                    {reserva.estados.map((estado, index) => (
                        <Step key={index}>
                            <StepLabel>{estado.estado} - {moment(estado.fecha.toDate()).format('D/M/YY hh:mm').toString()}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
        </DialogCustom>
    )
}

const ReservasList = () => {
    const classes = useStyles();

    const { currentUser } = useContext(AuthContext);

    const [reservas, setReservas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reservasShow, setReservasShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [reservaDetail, setReservaDetail] = useState(null)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (reservas.length === 0) {
            async function obtenerReservas(id) {
                await getReservas(id).then(
                    (result) => {
                        if (result.status === "OK") {
                            setReservas(result.data)
                            setIsLoading(false)
                        } else {
                            console.log(result.message)
                            setIsLoading(false)
                            alert(result.message)
                            return;
                        }
                    }
                )
            }
            obtenerReservas(currentUser.uid)
        }
    }, [currentUser, reservas])


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
                        Tus Reservas
                    </Typography>
                    <Divider variant="middle" className={classes.divider} />
                </Grid>
                {isLoading ? (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.circularProgress}>
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.container}
                        >
                            {reservas.length > 0 ? (
                                reservas.map((reserva, index) => (
                                    <Grid key={index} item xs={12} md={3}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                title={` 
                                                ${moment(reserva.fechaInicio.toDate()).format("DD/MM/YYYY")} 
                                                ${moment(reserva.fechaInicio.toDate()).format("HH:mm")} - 
                                                ${moment(reserva.fechaFin.toDate()).format("HH:mm")}`}
                                                titleTypographyProps={{ align: 'center' }}
                                                className={classes.cardHeader}
                                            />
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={reserva.espacio.foto[0] ? reserva.espacio.foto[0] : tipoEspacio[reserva.espacio.tipoEspacio].urlImagen}
                                                title="Image title"
                                            />
                                            <CardContent className={classes.cardContent} >
                                                <Typography>
                                                    <b>{reserva.espacio.descripcion}</b>
                                                </Typography>
                                                <Typography className={classes.cardText}>
                                                    Tipo de Espacio: <b>{reserva.espacio.tipoEspacio}</b>
                                                </Typography>
                                                <Typography>
                                                    Complejo: <b><LinkCustom to={`/complejos/${reserva.complejo.id}`}>{reserva.nombre}</LinkCustom></b>
                                                </Typography>
                                                <Typography >
                                                    Dirección: <b>{reserva.complejo.ubicacion}</b>
                                                </Typography>
                                                <Typography>
                                                    Precio: <b>$ {reserva.monto}</b>
                                                </Typography>
                                                <Grid container
                                                    direction="row"
                                                    justify="space-around"
                                                    alignItems="center">
                                                    <Tooltip title="Estado">
                                                        <Chip
                                                            className={classes.chip}
                                                            label={reserva.estados[reserva.estados.length - 1].estado}
                                                            style={{ backgroundColor: colorsByEstado[reserva.estados[reserva.estados.length - 1].estado], color: '#FAFAFA' }}
                                                            onClick={() => {
                                                                setReservaDetail(reserva)
                                                                handleOpen()
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </Grid>
                                            </CardContent>
                                        </Card>

                                    </Grid>
                                ))
                            ) : (
                                <Alert severity="warning">¡No existen reservas realizadas por ti!</Alert>
                            )
                            }
                        </Grid>
                    </>
                )}
            </Grid >
            {reservaDetail ? (
                <ReservaDetail open={open} reserva={reservaDetail} onClose={handleClose} />
            ) : (
                null
            )}
        </>
    )
}

export default ReservasList
