import React from 'react'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography, CardContent, useTheme, useMediaQuery} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    content: {
        flex: '1 0 auto',
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
    horariosMobile: {
        width: '80%',
        marginBottom: theme.spacing(4),
    },
    horariosWeb: {
        width: '40%',
        marginBottom: theme.spacing(4),
    },
}));

const Horarios = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    return (
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
                            {props.horarios.Lunes.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Lunes.desde} - {props.horarios.Lunes.hasta}
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
                            {props.horarios.Martes.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Martes.desde} - {props.horarios.Martes.hasta}
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
                            {props.horarios.Miercoles.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Miercoles.desde} - {props.horarios.Miercoles.hasta}
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
                            {props.horarios.Jueves.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Jueves.desde} - {props.horarios.Jueves.hasta}
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
                            {props.horarios.Viernes.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Viernes.desde} - {props.horarios.Viernes.hasta}
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
                            {props.horarios.Sabado.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Sabado.desde} - {props.horarios.Sabado.hasta}
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
                            {props.horarios.Domingo.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Domingo.desde} - {props.horarios.Domingo.hasta}
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
                            {props.horarios.Feriados.abre ? (
                                <Typography color="textSecondary" className={classes.tituloSeccion}>
                                    {props.horarios.Feriados.desde} - {props.horarios.Feriados.hasta}
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
    )
}

export default Horarios
