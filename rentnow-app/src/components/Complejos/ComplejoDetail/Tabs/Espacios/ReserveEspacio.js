import React from 'react'

// Material UI
import { Grid, CardHeader, Card, CardMedia, CardContent, Tooltip, Chip, Typography, CardActions, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// Iconos
import PeopleIcon from '@material-ui/icons/People';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

// Componentes Genericos
import LinkCustom from "components/utils/LinkCustom/LinkCustom";

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
        paddingTop: '56.25%',
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

const ReserveEspacio = (props) => {
    const { espacios, idComplejo } = props
    const classes = useStyles();
    return (
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
                        </Grid>
                    ))}
                </>
            ) : (
                null
            )}
        </Grid>
    )
}

export default ReserveEspacio
