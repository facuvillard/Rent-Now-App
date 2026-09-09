import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';
import { loginWithGmail } from '@/firebase';
import { recoverAndResetPassword, signIn } from 'api/auth';
import AlertCustom from 'components/utils/AlertCustom/AlertCustom';
import RegisterExtraData from './RegisterExtraData';
import rentnowLogo from 'assets/Landing/rentnow-logo-landing.png';

const Login = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({ type: 'info', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const response = await signIn(values.email, values.password);
      if (response.status === 'OK') {
        setAlertProps({ type: 'success', text: response.message });
        setShowAlert(true);
        navigate(Routes.COMPLEJOS);
      } else {
        setAlertProps({ type: 'error', text: response.message });
        setShowAlert(true);
        setIsLoading(false);
      }
    },
  });

  const handleLoginWithGmail = () => {
    setIsLoading(true);
    loginWithGmail()
      .then((user) => {
        if (user.additionalUserInfo?.isNewUser) {
          setUserData({
            uid: user.user.uid,
            email: user.additionalUserInfo.profile?.email || user.user.email,
          });
          setShowNewUserForm(true);
        } else {
          navigate(Routes.COMPLEJOS);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setAlertProps({
          type: 'error',
          text: 'Error al iniciar sesión con Google.',
        });
        setShowAlert(true);
      });
  };

  const handleClickRecoverAndResetPassword = async () => {
    if (!formik.values.email) {
      setAlertProps({
        type: 'warning',
        text: 'Por favor ingresá tu email en el campo correspondiente para resetear tu contraseña.',
      });
      setShowAlert(true);
      return;
    }

    const result = await recoverAndResetPassword(formik.values.email);
    if (result.status === 'OK') {
      setAlertProps({
        type: 'success',
        text: 'Se ha enviado un correo con instrucciones para recuperar tu contraseña.',
      });
      setShowAlert(true);
    } else {
      setAlertProps({
        type: 'error',
        text: 'No se pudo enviar el correo de recuperación. Verificá que el email sea válido.',
      });
      setShowAlert(true);
    }
  };

  if (showNewUserForm) {
    return (
      <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
        <RegisterExtraData userData={userData} />
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8FAFC',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="xs">
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
          {/* Header */}
          <Box
            component={RouterLink}
            to={Routes.LANDING}
            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
          >
            <Box
              component="img"
              src={rentnowLogo}
              alt="Rent Now"
              sx={{ height: 42, objectFit: 'contain' }}
            />
          </Box>

          <Avatar sx={{ bgcolor: '#FCC931', color: '#1E293B', mb: 1, width: 48, height: 48 }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#1E293B' }}>
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Ingresá a tu cuenta para buscar y reservar canchas
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
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

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
              <Typography
                variant="body2"
                onClick={handleClickRecoverAndResetPassword}
                sx={{
                  color: 'primary.dark',
                  cursor: 'pointer',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                ¿Olvidaste tu contraseña?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isLoading}
              sx={{ py: 1.4, fontWeight: 700, borderRadius: 2.5, mb: 2.5 }}
            >
              {isLoading ? <CircularProgress size={26} sx={{ color: '#1E293B' }} /> : 'Ingresar'}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">
                O CONTINUÁ CON
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleLoginWithGmail}
              startIcon={<GoogleIcon sx={{ color: '#EA4335' }} />}
              sx={{
                py: 1.2,
                borderRadius: 2.5,
                borderColor: 'rgba(0,0,0,0.15)',
                color: '#1E293B',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'rgba(0,0,0,0.3)',
                  bgcolor: 'rgba(0,0,0,0.02)',
                },
              }}
            >
              Continuar con Google
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                ¿Aún no tenés una cuenta?{' '}
                <Box
                  component={RouterLink}
                  to={Routes.REGISTER_USER}
                  sx={{
                    color: '#E0AC16',
                    fontWeight: 700,
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Registrate acá
                </Box>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      <AlertCustom
        type={alertProps.type}
        text={alertProps.text}
        open={showAlert}
        setOpen={setShowAlert}
      />
    </Box>
  );
};

export default Login;
