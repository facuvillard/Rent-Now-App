import React, { useState } from 'react'
import { Container, Avatar, Button, CircularProgress, Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import AlertCustom from './../../utils/AlertCustom/AlertCustom'
import { signIn } from './../../api/auth'
import * as Routes from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },



}))

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={Routes.LANDING}>
                RentNow
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Login = () => {
    const classes = useStyles();
    const [showAlert, setShowAlert] = useState(false);
    const [alertProps, setAlertProps] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            handleSubmit(values.email, values.password)
        },
    })

    const handleSubmit = async (email, password) => {
        setIsLoading(true);
        const response = await signIn(email, password);
        if (response.status === "OK") {
            setAlertProps({
                type: "success",
                text: response.message,
            });
            setShowAlert(true);
        } else {
            setAlertProps({
                type: "error",
                text: response.message,
            });
            setShowAlert(true);
            setIsLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper variant="outlined" className={classes.paper} >
                <CssBaseline />
                <div className={classes.main} >
                    <Avatar className={classes.avatar} >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
        </Typography>
                    <form noValidate className={classes.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}

                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading}
                        >
                            {!isLoading ? "Ingresar" : <CircularProgress />}
                        </Button>
                        <AlertCustom
                            type={alertProps.type}
                            text={alertProps.text}
                            open={showAlert}
                            setOpen={setShowAlert}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" color="secondary">
                                    ¿Olvidaste tu contraseña?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" color="secondary">
                                    ¿No tienes cuenta? Registrate
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </ Paper>
        </Container>
    )
}

export default Login
