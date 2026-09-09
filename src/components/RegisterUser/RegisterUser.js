import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';
import { getProvincesApi, getCitiesByProvincesApi } from 'api/geoApi';
import { signUpWithEmailApi } from 'api/auth';
import AlertCustom from '../utils/AlertCustom/AlertCustom';
import moment from 'moment';

export default function RegisterUser() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertProps, setAlertProps] = useState({ type: 'info', text: '' });
  const [alertShow, setAlertShow] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      celular: '',
      email: '',
      fechaNacimiento: moment().subtract(18, 'years').format('YYYY-MM-DD'),
      provincia: '',
      ciudad: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const resp = await signUpWithEmailApi(values);
        if (resp.status === 'ERROR') {
          setIsLoading(false);
          setAlertProps({ text: resp.message, type: 'error' });
          setAlertShow(true);
        } else {
          setAlertProps({
            text: '¡Usuario creado con éxito! Ya podés iniciar sesión.',
            type: 'success',
          });
          setAlertShow(true);
          setTimeout(() => {
            navigate(Routes.LOGIN);
          }, 1500);
        }
      } catch (err) {
        setIsLoading(false);
        setAlertProps({ text: 'Error al registrar usuario', type: 'error' });
        setAlertShow(true);
      }
    },
  });

  useEffect(() => {
    getProvincesApi().then((response) => {
      if (response?.provincias) {
        setProvinces(response.provincias);
      }
    });
  }, []);

  const handleCityTextField = async (cityName) => {
    setCityInput(cityName);
    if (!cityName || cityName.length < 3 || !formik.values.provincia) {
      setCities([]);
      return;
    }
    try {
      const response = await getCitiesByProvincesApi(formik.values.provincia, cityName);
      if (response?.localidades) {
        setCities(response.localidades);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: '#FCC931', color: '#1E293B', mb: 1.5, width: 50, height: 50 }}>
          <PersonOutlineIcon fontSize="medium" />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#1E293B' }}>
          ¡Creá tu Cuenta!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
          Completá tus datos para empezar a reservar en los mejores complejos
        </Typography>

        <Box component="form" className="form" onSubmit={formik.handleSubmit} noValidate sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="name"
              value={formik.values.nombre}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="apellido"
              label="Apellido"
              name="apellido"
              autoComplete="last-name"
              value={formik.values.apellido}
              onChange={formik.handleChange}
            />
          </Box>

          <TextField
            margin="normal"
            type="tel"
            required
            fullWidth
            id="celular"
            label="Teléfono Celular"
            name="celular"
            autoComplete="tel"
            value={formik.values.celular}
            onChange={formik.handleChange}
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
            value={formik.values.fechaNacimiento}
            onChange={formik.handleChange}
          />

          <TextField
            select
            margin="normal"
            required
            fullWidth
            id="provincia"
            label="Provincia"
            name="provincia"
            value={formik.values.provincia}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('ciudad', '');
              setCities([]);
            }}
          >
            {provinces.map((opt) => (
              <MenuItem key={opt.id} value={opt.nombre}>
                {opt.nombre}
              </MenuItem>
            ))}
          </TextField>

          <Autocomplete
            disabled={!formik.values.provincia}
            options={cities}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.nombre || '')}
            value={formik.values.ciudad || null}
            onChange={(_, newValue) => {
              const name = typeof newValue === 'string' ? newValue : newValue?.nombre || '';
              formik.setFieldValue('ciudad', name);
            }}
            inputValue={cityInput}
            onInputChange={(_, value) => handleCityTextField(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                name="ciudad"
                label="Ciudad"
                required
              />
            )}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, py: 1.4, fontWeight: 700, borderRadius: 2.5 }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: '#1E293B' }} /> : 'Registrarme'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tenés una cuenta?{' '}
              <Box
                component={RouterLink}
                to={Routes.LOGIN}
                sx={{
                  color: '#E0AC16',
                  fontWeight: 700,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Iniciá sesión acá
              </Box>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <AlertCustom
        type={alertProps.type}
        text={alertProps.text}
        open={alertShow}
        setOpen={setAlertShow}
      />
    </Container>
  );
}
