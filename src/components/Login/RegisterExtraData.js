import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from 'formik';
import { submitExtraDataOnRegister } from 'api/auth';
import { getProvincesApi, getCitiesByProvincesApi } from 'api/geoApi';
import { useNavigate } from 'react-router-dom';
import * as Routes from 'constants/routes';
import moment from 'moment';

const RegisterExtraData = ({ userData }) => {
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [ciudadInput, setCiudadInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const result = await getProvincesApi();
        if (result?.provincias) {
          setProvincias(result.provincias);
        }
      } catch (err) {
        console.error('Error fetching provinces', err);
      }
    }
    fetchProvinces();
  }, []);

  const handleCitiesChange = async (city, province) => {
    setCiudadInput(city);
    if (!city || city.length < 3 || !province) {
      return;
    }
    try {
      const result = await getCitiesByProvincesApi(province, city);
      if (result?.localidades) {
        const localidadesNames = result.localidades.map((localidad) => localidad.nombre);
        setCiudades(localidadesNames);
      }
    } catch (err) {
      console.error('Error fetching cities', err);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: '#FCC931', color: '#1E293B', mb: 1, width: 48, height: 48 }}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#1E293B' }}>
        Completá tu Perfil
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
        Necesitamos unos datos adicionales para gestionar tus reservas
      </Typography>

      <Formik
        initialValues={{
          nombre: '',
          apellido: '',
          ciudad: '',
          provincia: '',
          celular: '',
          fechaNacimiento: moment().subtract(18, 'years').format('YYYY-MM-DD'),
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const result = await submitExtraDataOnRegister({ ...values, ...userData });
            if (result.status === 'OK') {
              navigate(Routes.COMPLEJOS);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="name"
              autoFocus
              value={values.nombre}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="apellido"
              label="Apellido"
              id="apellido"
              autoComplete="last-name"
              value={values.apellido}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              type="tel"
              required
              fullWidth
              name="celular"
              label="Teléfono Celular"
              id="celular"
              autoComplete="tel"
              value={values.celular}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              type="date"
              required
              fullWidth
              id="fechaNacimiento"
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: moment().format('YYYY-MM-DD') }}
              value={values.fechaNacimiento}
              onChange={handleChange}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="provincia-select-label">Provincia</InputLabel>
              <Select
                labelId="provincia-select-label"
                name="provincia"
                label="Provincia"
                value={values.provincia}
                onChange={(e) => {
                  setFieldValue('provincia', e.target.value);
                  setFieldValue('ciudad', '');
                  setCiudades([]);
                }}
              >
                {provincias.map((prov) => (
                  <MenuItem key={prov.id} value={prov.nombre}>
                    {prov.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Autocomplete
              disabled={!values.provincia}
              options={ciudades}
              value={values.ciudad || null}
              onChange={(_, newValue) => {
                setFieldValue('ciudad', newValue || '');
              }}
              inputValue={ciudadInput}
              onInputChange={(_, newInputValue) => {
                handleCitiesChange(newInputValue, values.provincia);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  required
                  name="ciudad"
                  label="Ciudad"
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, py: 1.4, fontWeight: 700, borderRadius: 2.5 }}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: '#1E293B' }} /> : 'Confirmar y Comenzar'}
            </Button>
          </Box>
        )}
      </Formik>
    </Paper>
  );
};

export default RegisterExtraData;
