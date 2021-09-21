import React, { useState, useEffect } from 'react'

// Material UI
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {
    Grid, CardHeader, Card,
    CardMedia, CardContent, Tooltip,
    Chip, Typography, CardActions,
    Button, useTheme, useMediaQuery, Divider,
    CircularProgress, IconButton
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// Iconos
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import SportsFootballOutlinedIcon from '@material-ui/icons/SportsFootballOutlined';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// Componentes Genericos
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import DialogCustom from "components/utils/DialogCustom/DialogCustom"

//Constantes
import { tipoEspacio } from "constants/espacios/constants"

//APIs
import { getTiposEspacioByIdComplejo, getHorariosAndEspacios } from "api/espacios"

//utils
import moment from "moment"
import MomentUtils from "@date-io/moment"

import Slider from 'infinite-react-carousel';
import Alert from '@material-ui/lab/Alert';
import Swal from 'sweetalert2'

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
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
    chip: {
        backgroundColor: '#F9F6A2',
        "&:hover, &:focus": {
            backgroundColor: "#F7F48B",
            cursor: "pointer",
        }
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    cardText: {
        paddingTop: theme.spacing(2),
    },
    chipDisponible: {
        backgroundColor: '#70b578',
        "&:hover, &:focus": {
            backgroundColor: "#ABEBC6",
            cursor: "pointer",
        }
    },
    chipNoDisponible: {
        backgroundColor: '#c2c2c2',
    },
    tituloSeccion: {
        marginBottom: theme.spacing(2)
    },
    loading: {
        marginTop: theme.spacing(4)
    }
}))

function EspacioCard({ espacio, idComplejo, fecha, horarioInicio, horarioFin, complejo, duracion }) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader
                title={espacio.nombre}
                titleTypographyProps={{ align: 'center' }}
                className={classes.cardHeader}
            />
            <CardMedia
                className={classes.cardMedia}
                image={espacio.foto[0] ? espacio.foto[0] : tipoEspacio[espacio.tipoEspacio].urlImagen}
                title="Image title"
            />
            <CardContent className={classes.cardContent}>
                <Grid container
                    direction="row"
                    justify="space-around"
                    alignItems="center">
                    <Tooltip title="Precio de Turno">
                        <Chip
                            className={classes.chip}
                            icon={<AttachMoneyIcon />}
                            label={espacio.precioTurno}
                        />
                    </Tooltip>
                    <Tooltip title="Capacidad de Personas">
                        <Chip
                            className={classes.chip}
                            icon={<PeopleIcon />}
                            label={espacio.capacidad}
                        />
                    </Tooltip>
                </Grid>
                <Typography className={classes.cardText}>
                    Tipo de Espacio: <b>{espacio.tipoEspacio}</b>
                </Typography>
                <Typography>
                    Tipo de Piso: <b>{espacio.tipoPiso}</b>
                </Typography>
                <Typography>
                    Infraestructura: <b>{espacio.infraestructura}</b>
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <LinkCustom
                        to={
                            {
                                pathname: `/complejos/${idComplejo}/reservas/confirmar`,
                                state: {
                                    espacio: espacio,
                                    fecha: fecha,
                                    horarioInicio: horarioInicio,
                                    horarioFin: horarioFin,
                                    complejo: complejo,
                                    idComplejo: idComplejo,
                                    duracion: duracion
                                }
                            }
                        }
                    >
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                        >
                            Reservar
                        </Button>
                    </LinkCustom>
                </Grid>
            </CardActions>
        </Card>
    )
}

function SelectTipoEspacio({ open, tiposEspacio, onClose, selectedTipo }) {

    const handleClose = () => {
        onClose(selectedTipo);
    };

    const handleListItemClick = (tipo) => {
        onClose(tipo);
    };

    return (
        <DialogCustom title="Seleccione tipo de espacio: " open={open} onClose={handleClose}>
            <List>
                {

                    tiposEspacio.map((tipo, index) => {
                        return (
                            <ListItem autoFocus onClick={() => { handleListItemClick(tipo) }} button key={tipo + index}>
                                <ListItemAvatar>
                                    <Avatar src={tipoEspacio[tipo].urlImagen} />
                                </ListItemAvatar>
                                <ListItemText primary={tipo} />
                            </ListItem>
                        )
                    }
                    )}
            </List>
        </DialogCustom>
    )
}
function SelectDuracion({ open, duraciones, onClose, selectedDuracion }) {

    const handleClose = () => {
        onClose(selectedDuracion);
    };

    const handleListItemClick = (duracion) => {
        onClose(duracion);
    };

    return (
        <DialogCustom title="Seleccione la duración: " open={open} onClose={handleClose}>
            <List>
                {

                    duraciones.map((duracion, index) => {
                        return (
                            <ListItem autoFocus onClick={() => { handleListItemClick(duracion) }} button key={duracion}>
                                <ListItemText primary={`${duracion}h`} />
                            </ListItem>
                        )
                    }
                    )}
            </List>
        </DialogCustom>
    )
}

function ButtonForDatepicker(props) {
    return (
        <Button {...props} fullWidth variant="outlined" startIcon={<TodayOutlinedIcon />} >
            {props.value ? props.value : "Fecha"}
        </Button>
    )
}

function DatepickerReserva({ selectedFecha, handleDateChange }) {
    moment.locale("es");

    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale='es'>
            <DatePicker value={selectedFecha} disablePast cancelLabel="" TextFieldComponent={(props) => <ButtonForDatepicker {...props} />} okLabel="" autoOk onChange={handleDateChange} format="DD/MM/yyyy" inputVariant="outlined" emptyLabel="Fecha" />
        </MuiPickersUtilsProvider>
    )
}

const ReserveEspacio = (props) => {
    const [reserva, setReserva] = useState({})
    const [espaciosToShow, setEspaciosToShow] = useState([])
    const [tiposEspacioComplejo, setTiposEspacioComplejo] = useState([]);
    const [openSelectTipoEspacio, setOpenSelectTipoEspacio] = useState(false);
    const [selectedTipoEspacio, setSelectedTipoEspacio] = useState(null);
    const [openSelectDuracion, setOpenSelectDuracion] = useState(false);
    const [selectedDuracion, setSelectedDuracion] = useState(null);
    const [selectedFecha, setSelectedFecha] = useState(null)
    const [horariosAndEspacios, setHorariosAndEspacios] = useState(null)
    const [isLoadingTipoEspacio, setIsLoadingTipoEspacio] = useState(true)
    const [isLoadingHorariosAndEspacios, setIsLoadingHorariosAndEspacios] = useState(false)
    const { idComplejo, complejo } = props
    const classes = useStyles();

    useEffect(() => {
        async function getTiposEspacios() {
            const result = await getTiposEspacioByIdComplejo(idComplejo);
            setTiposEspacioComplejo(result.data)
            setIsLoadingTipoEspacio(false)
        }
        getTiposEspacios();

    }, [idComplejo])

    useEffect(() => {
        async function getHorarios(tipoEspacio, duracion, fecha, idComplejo, complejo) {
            const result = await getHorariosAndEspacios(moment(fecha).format('DD/MM/YYYY'), tipoEspacio, idComplejo, duracion, complejo)
            if (result.status === "OK") {
                setHorariosAndEspacios(result.data)
                if (result.data.horarios.length === 0) {
                    Swal.fire({
                        title: '¡Error!',
                        text: 'No existen horarios disponibles para los filtros ingresados',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
                setIsLoadingHorariosAndEspacios(false)
            } else {
                alert(result.message)
                setIsLoadingHorariosAndEspacios(false)
            }
        }
        if (selectedTipoEspacio && selectedDuracion && selectedFecha) {
            setIsLoadingHorariosAndEspacios(true)
            getHorarios(selectedTipoEspacio, selectedDuracion, selectedFecha, idComplejo, complejo);
            espaciosToShow.splice(0, espaciosToShow.length)
        }
    }, [selectedDuracion, selectedTipoEspacio, selectedFecha, idComplejo, complejo])

    const handleSelectTipoEspacioOpen = () => {
        setOpenSelectTipoEspacio(true)
    }

    const handleCloseSelectTipoEspacio = (value) => {
        setOpenSelectTipoEspacio(false);
        setSelectedTipoEspacio(value);
    };

    const handleSelectDuracionOpen = () => {
        setOpenSelectDuracion(true)
    }

    const handleCloseSelectDuracion = (value) => {
        setOpenSelectDuracion(false);
        setSelectedDuracion(value);
    };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", marginLeft: '10px' }}>
                <IconButton size='small' style={{ backgroundColor: "gray" }}>
                    <ArrowBackIcon style={{ color: "white" }} onClick={onClick} />
                </IconButton>
            </div>
        );
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", marginRight: '10px' }}>
                <IconButton size='small' style={{ backgroundColor: "gray" }}>
                    <ArrowForwardIcon style={{ color: "white" }} onClick={onClick} />
                </IconButton>
            </div>
        );
    }

    const settings = {
        centerMode: true,
        centerPadding: 70,
        arrowsBlock: true,
        arrows: true,
        slidesPerRow: matches ? 5 : 2,
        dots: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const handleShowEspacios = (horario) => {
        setReserva({
            horarioInicio: horario.horaDesde,
            horarioFin: horario.horaHasta
        })
        horariosAndEspacios.espacios.forEach((espacio) => {
            horario.espacios.forEach((idEspacio) => {
                if (espacio.id === idEspacio) {
                    espaciosToShow.push(espacio)
                }
            })
        })
    };



    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                {isLoadingTipoEspacio ? (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.loading}
                    >
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12} >
                            <Button fullWidth variant="outlined" startIcon={<SportsFootballOutlinedIcon />} onClick={handleSelectTipoEspacioOpen}>
                                {selectedTipoEspacio ? selectedTipoEspacio : "Tipo"}
                            </Button>
                        </Grid>
                        <Grid item xs={6} >
                            <DatepickerReserva selectedFecha={selectedFecha} handleDateChange={setSelectedFecha} />
                        </Grid>
                        <Grid item xs={6} >
                            <Button fullWidth variant="outlined" startIcon={<QueryBuilderOutlinedIcon />} onClick={handleSelectDuracionOpen}>
                                {selectedDuracion ? `${selectedDuracion}h` : "Tiempo"}
                            </Button>
                        </Grid>
                    </>
                )}
                {isLoadingHorariosAndEspacios ? (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.loading}
                    >
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        {horariosAndEspacios ? (
                            <Grid item xs={12} >
                                <Divider className={classes.divider} />
                                <Typography variant='subtitle2' className={classes.tituloSeccion} gutterBottom>
                                    Seleccione un Horario:
                                </Typography>
                                {horariosAndEspacios.horarios.length !== 0 ? (
                                    <Slider {...settings}>
                                        {horariosAndEspacios.horarios.map((horario, index) => (
                                            <Chip
                                                key={index}
                                                label={`${horario.horaDesde} - ${horario.horaHasta}`}
                                                className={horario.espacios.length === 0 ? classes.chipNoDisponible : classes.chipDisponible}
                                                clickable={horario.espacios.length === 0 ? false : true}
                                                onClick={() => {
                                                    espaciosToShow.splice(0, espaciosToShow.length)
                                                    handleShowEspacios(horario)
                                                }}
                                            />
                                        ))}
                                    </Slider>
                                ) : (
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Alert severity="error">¡No existen horarios disponibles para los filtros seleccionados!</Alert>
                                    </Grid>
                                )}
                            </Grid>
                        ) : (
                            null
                        )}
                    </>
                )}

                {espaciosToShow.length !== 0 ? (
                    <>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={4}
                        >
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                                <Typography variant='subtitle2' className={classes.tituloSeccion} gutterBottom>
                                    Seleccione un Espacio:
                                </Typography>
                            </Grid>
                            {espaciosToShow.map((espacio) => (
                                <Grid item key={espacio.id} xs={12} sm={6} md={4}>
                                    <EspacioCard complejo={complejo} espacio={espacio} idComplejo={idComplejo} fecha={moment(selectedFecha).format('DD/MM/YYYY')} horarioInicio={reserva.horarioInicio} horarioFin={reserva.horarioFin} duracion={selectedDuracion} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                        style={{ paddingTop: '100px' }}
                    >
                        <Alert severity="info">¡Seleccione un tipo de espacio, fecha y duración!</Alert>
                    </Grid>
                )}
            </Grid>

            <SelectTipoEspacio open={openSelectTipoEspacio} tiposEspacio={tiposEspacioComplejo} onClose={handleCloseSelectTipoEspacio} selectedTipo={selectedTipoEspacio} />
            <SelectDuracion open={openSelectDuracion} duraciones={["1", "1:30", "2", "2:30", "3", "3:30"]} onClose={handleCloseSelectDuracion} selectedDuracion={selectedDuracion} />

        </>
    )
}

export default ReserveEspacio
