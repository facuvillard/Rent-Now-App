import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, CssBaseline, Avatar, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import Autocomplete from "@material-ui/lab/Autocomplete";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik'
import { submitExtraDataOnRegister } from 'api/auth'
import { getProvincesApi, getCitiesByProvincesApi } from "api/geoApi";
import {useHistory} from 'react-router-dom'

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
        }

    }
})
)

const RegisterExtraData = (props) => {
    const classes = useStyles();

    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [ciudad, setCiudad] = useState("");

    const history = useHistory()

    useEffect(() => {
        async function fetchProvinces() {
          try {
            const result = await getProvincesApi();
            if (result.provincias) {
              setProvincias(result.provincias);
            } else {
              return null;
            }
          } catch (err) {
            alert("se produjo un error");
            return [];
          }
        }
        fetchProvinces();
      }, []);

    const handleCitiesChange = async (city, province) => {
        setCiudad(city);
    
        if (city.length < 3) {
          return;
        }
        try {
          const result = await getCitiesByProvincesApi(province, city);
          if (result.localidades) {
            const localidadesNames = result.localidades.map(
              (localidad) => localidad.nombre
            );
            setCiudades(localidadesNames);
          }
        } catch (err) {
          alert("hubo un error");
        }
      };

    return (
        <Paper variant="outlined" className={classes.paper}>
            <CssBaseline />
            <div className={classes.main} >
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Información adicional
            </Typography>
                <Formik
                    initialValues={{
                        nombre: '',
                        apellido: '',
                        telefono: '',
                        ciudad: '',
                        provincia: ''
                    }}

                    onSubmit={(values) => {
                        console.log('Extra data submitted: ', values, props.userData)
                        submitExtraDataOnRegister({ ...values, ...props.userData }).then(result => {
                            if(result.status === "OK"){
                                history.push("/landing")
                            } else {

                            }
                        })
                    }}
                >
                    {({ handleChange, handleSubmit, isSubmitting, values }) =>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                name="nombre"
                                autoComplete="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="apellido"
                                label="Apellido"
                                id="apellido"
                                autoComplete="last-name"
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="telefono"
                                label="Telefono"
                                id="telefono"
                                autoComplete="phone"
                                onChange={handleChange}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="provincia-select-label">
                                    Provincia
                                </InputLabel>
                                <Select
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    labelId="provincia-select-label"
                                    name="provincia"
                                    value={values.provincia}
                                    onChange={(e) => {
                                        values.ciudad = "";
                                        handleChange(e);
                                    }}
                                    id="provincia-select"
                                >
                                    {provincias.length > 0
                                        ? provincias.map((prov) => (
                                            <MenuItem key={prov.id} value={prov.nombre}>
                                                {prov.nombre}
                                            </MenuItem>
                                        ))
                                        : null}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    label="Ciudad"
                                    required
                                    value={values.ciudad}
                                    onChange={(_, newValue) => {
                                        const target = {
                                            name: "ciudad",
                                            value: newValue,
                                        };

                                        handleChange({ target });
                                    }}
                                    inputValue={ciudad}
                                    onInputChange={(_, value) => {
                                        handleCitiesChange(value, values.provincia);
                                    }}
                                    name="ciudad"
                                    options={ciudades}
                                    renderInput={(params) => (
                                        <TextField
                                            name="ciudad"
                                            required
                                            label="Ciudad"
                                            variant="outlined"
                                            {...params}
                                        />
                                    )}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                            >Confirmar</Button>
                        </form>
                    }
                </Formik>
            </div>
        </Paper>
    )
}

export default RegisterExtraData
