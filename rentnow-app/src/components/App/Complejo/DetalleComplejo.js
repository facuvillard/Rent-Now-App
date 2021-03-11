import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';
import Modal from 'utils/Modal/Modal'
import { Grid, CircularProgress, CardHeader, useTheme, useMediaQuery } from "@material-ui/core";
import { getComplejosById } from "api/complejos";
import { getEspaciosByIdComplejo } from "api/espacios"
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import PeopleIcon from '@material-ui/icons/People';
import Tooltip from '@material-ui/core/Tooltip';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 300,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    tituloSeccion: {
        textAlign: 'center'
    },
    cardText: {
        paddingTop: theme.spacing(2),
    },
    chip: {
        backgroundColor: '#F9F6A2',
        "&:hover, &:focus": {
            backgroundColor: "#F7F48B",
            cursor: "pointer",
        }
    },
    horariosMobile: {
        width: '80%',
        marginBottom: theme.spacing(4),
    },
    horariosWeb: {
        width: '20%',
        marginBottom: theme.spacing(4),
    },
    redes: {
        paddingTop: theme.spacing(2),
    },
    section: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}));


const DetalleComplejo = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [complejo, setComplejo] = useState({});
    const [espacios, setEspacios] = useState({})


    const [open, setOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(true);

    const idComplejo = "HijkhSYMeyCDSlkd2x6E";

    const handleClick = () => { setOpen(true) }

    useEffect(() => {
        getComplejosById(idComplejo).then((response) => {
            if (response.status === "OK") {
                setComplejo(response.data);
                getEspaciosByIdComplejo(idComplejo).then((response) => {
                    if (response.status === "OK") {
                        setEspacios(response.data);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }
                })
            } else {
                setIsLoading(false);
            }
        });

    }, [idComplejo]);

    console.log(complejo, espacios)

    return (
        <>
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
                    <Card className={classes.root} variant="outlined">
                        <CardMedia
                            className={classes.cover}
                            image={complejo.fotos[0]}
                            title="imagenComplejo"
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h4">
                                    {complejo.nombre}
                                </Typography>
                                <Link href="#" onClick={handleClick} color="inherit">
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {complejo.ubicacion.calle}, {complejo.ubicacion.numero} {complejo.ubicacion.ciudad} {complejo.ubicacion.provincia}
                                    </Typography>
                                </Link>
                                <Rating name="read-only" value={complejo.valoracion} readOnly precision={0.5} size="small" />
                                <Typography className={classes.redes} >
                                    Contactanos
                                </Typography>
                                {complejo.redes.facebook !== '' ? (
                                    <Link href={complejo.redes.facebook} >
                                        <IconButton color="secondary" aria-label="upload picture" component="span">
                                            <FacebookIcon />
                                        </IconButton>
                                    </Link>
                                ) : (null)}
                                {complejo.redes.instagram !== '' ? (
                                    <IconButton href={complejo.redes.instagram} color="secondary" aria-label="upload picture" component="span">
                                        <InstagramIcon />
                                    </IconButton>
                                ) : null}
                                {complejo.redes.twitter !== '' ? (
                                    <IconButton href={complejo.redes.twitter} color="secondary" aria-label="upload picture" component="span">
                                        <TwitterIcon />
                                    </IconButton>
                                ) : null}
                                {/* {complejo.descripcion ? (
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {complejo.descripcion}
                                        </Typography>
                                    ) : null} */}
                            </CardContent>
                        </div>
                    </Card>
                    <section className={classes.section} >
                    <Grid item xs={12} md={12}>
                        <Typography className={classes.tituloSeccion} variant="h4" gutterBottom>
                            Espacios
                        </Typography>
                    </Grid>
                    <Typography color="textSecondary" className={classes.tituloSeccion}>
                        Aquí encontraras todos los espacios disponibles para reservar. Selecciona uno para ver mayores detalles del mismo.
                    </Typography>
                    <Container className={classes.cardGrid} maxWidth="md">
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
                                            <Card className={classes.card}>
                                                <CardHeader
                                                    title={espacio.nombre}
                                                    titleTypographyProps={{ align: 'center' }}
                                                    className={classes.cardHeader}
                                                />
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={espacio.foto[0]}
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
                                                        <Button size="small" variant="contained" color="primary">
                                                            Reservar
                                                </Button>
                                                    </Grid>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                null
                            )}
                        </Grid>
                    </Container>
                    </section>
                    <Divider variant="middle" />
                    <section className={classes.section} >
                    <Grid item xs={12} md={12}>
                        <Typography className={classes.tituloSeccion} variant="h4" gutterBottom>
                            Horarios
                        </Typography>
                    </Grid>
                    <Typography color="textSecondary" className={classes.tituloSeccion}>
                        Aquí encontraras todos los horarios de atención del complejo
                    </Typography>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >

                        <div className={matches ? (classes.horariosWeb) : (classes.horariosMobile)}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Lunes
                        </Typography>
                                        {complejo.horarios.Lunes.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Lunes.desde} - {complejo.horarios.Lunes.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Martes
                        </Typography>
                                        {complejo.horarios.Martes.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Martes.desde} - {complejo.horarios.Martes.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Miercoles
                        </Typography>
                                        {complejo.horarios.Miercoles.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Miercoles.desde} - {complejo.horarios.Miercoles.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Jueves
                        </Typography>
                                        {complejo.horarios.Jueves.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Jueves.desde} - {complejo.horarios.Jueves.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Viernes
                        </Typography>
                                        {complejo.horarios.Viernes.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Viernes.desde} - {complejo.horarios.Viernes.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Sabado
                        </Typography>
                                        {complejo.horarios.Sabado.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Sabado.desde} - {complejo.horarios.Sabado.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Domingo
                        </Typography>
                                        {complejo.horarios.Domingo.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Domingo.desde} - {complejo.horarios.Domingo.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Typography color="textSecondary" className={classes.tituloSeccion}>
                                            Feriados
                        </Typography>
                                        {complejo.horarios.Feriados.abre ? (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                {complejo.horarios.Feriados.desde} - {complejo.horarios.Feriados.hasta}
                                            </Typography>
                                        ) : (
                                            <Typography color="textSecondary" className={classes.tituloSeccion}>
                                                Cerrado
                                            </Typography>

                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    </section>
                    <Divider variant="middle" />
                    <Grid item xs={12} md={12}>
                        <Typography className={classes.tituloSeccion} variant="h4" gutterBottom>
                            Valoraciones
                        </Typography>
                    </Grid>
                    <Typography color="textSecondary" className={classes.tituloSeccion}>
                        Aquí encontraras todas las valoraciones y opiniones realizadas por los usuarios sobre el complejo y sus espacios
                    </Typography>
                    <Divider variant="middle" />
                    <Modal
                        title="Ubicación"
                        open={open}
                        setOpen={setOpen}
                        size="sm"
                    >
                        "Mapa"
            </Modal>
                </>
            )}
        </>
    )
}

export default DetalleComplejo
