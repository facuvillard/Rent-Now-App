import React, { useState, useEffect } from 'react'

// Material UI
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Grid, CardHeader, Card, CardMedia, CardContent, Tooltip, Chip, Typography, CardActions, Button } from "@material-ui/core";
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

// Componentes Genericos
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import DialogCustom from "components/utils/DialogCustom/DialogCustom"

//Constantes
import { tipoEspacio } from "constants/espacios/constants"

//APIs
import { getTiposEspacioByIdComplejo, getEspaciosByIdComplejoAndTipo } from "api/espacios"

//utils
import moment from "moment"
import MomentUtils from "@date-io/moment"

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
    cardText: {
        paddingTop: theme.spacing(2),
    },
}))

function EspacioCard({ espacio, idComplejo }) {
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
                image={ espacio.foto[0]  ? espacio.foto[0] : tipoEspacio[espacio.tipoEspacio].urlImagen }
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
                                pathname: `/complejos/${idComplejo}/espacios/${espacio.id}`,
                                state: { espacio: espacio }
                            }
                        }
                    >
                        <Button size="small" variant="contained" color="primary">
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
                                {/* <ListItemAvatar>
                                    <Avatar src={tipoEspacio[tipo].urlImagen} />
                                </ListItemAvatar> */}
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
    const [espacios, setEspacios] = useState([])
    const [tiposEspacioComplejo, setTiposEspacioComplejo] = useState([]);
    const [openSelectTipoEspacio, setOpenSelectTipoEspacio] = useState(false);
    const [selectedTipoEspacio, setSelectedTipoEspacio] = useState(null);
    const [openSelectDuracion, setOpenSelectDuracion] = useState(false);
    const [selectedDuracion, setSelectedDuracion] = useState(null);
    const [selectedFecha, setSelectedFecha] = useState(null)
    const { idComplejo } = props

    useEffect(() => {
        async function getTiposEspacios() {
            const result = await getTiposEspacioByIdComplejo(idComplejo);
            setTiposEspacioComplejo(result.data)
        }
        getTiposEspacios();
    }, [idComplejo])

    useEffect(() => {
        async function getEspacios(){
            const result = await getEspaciosByIdComplejoAndTipo(idComplejo, selectedTipoEspacio)
            if(result.status === "OK"){
                setEspacios(result.data)
            } else {
                alert(result.message)
            }
        }
        if(!selectedTipoEspacio){
            return;
        }
        getEspacios();
    }, [selectedDuracion, selectedTipoEspacio, selectedFecha])

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

    return (
        <>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Grid item xs={4} >
                    <Button fullWidth variant="outlined" startIcon={<SportsFootballOutlinedIcon />} onClick={handleSelectTipoEspacioOpen}>
                        {selectedTipoEspacio ? selectedTipoEspacio : "Tipo"}
                    </Button>
                </Grid>
                <Grid item xs={4} >
                    <DatepickerReserva selectedFecha={selectedFecha} handleDateChange={setSelectedFecha} />
                </Grid>
                <Grid item xs={4} >
                    <Button fullWidth variant="outlined" startIcon={<QueryBuilderOutlinedIcon />} onClick={handleSelectDuracionOpen}>
                        {selectedDuracion ? `${selectedDuracion}h` : "Tiempo"}
                    </Button>
                </Grid>

            </Grid>

            <SelectTipoEspacio open={openSelectTipoEspacio} tiposEspacio={tiposEspacioComplejo} onClose={handleCloseSelectTipoEspacio} selectedTipo={selectedTipoEspacio} />
            <SelectDuracion open={openSelectDuracion} duraciones={["1","1:30","2","2:30","3","3:30"]} onClose={handleCloseSelectDuracion} selectedDuracion={selectedDuracion} />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={4}
            >
                {espacios ? (
                    <>
                        {espacios.map((espacio) => (
                            <Grid item key={espacio.id} xs={10} sm={6} md={4}>
                                <EspacioCard espacio={espacio} idComplejo={idComplejo} />
                            </Grid>
                        ))}
                    </>
                ) : (
                    <Typography>Seleccione un tipo de espacio para ver los disponibles.</Typography>
                )}
            </Grid>
        </>
    )
}

export default ReserveEspacio
