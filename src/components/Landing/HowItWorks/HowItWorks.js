import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import registerImage from 'assets/Landing/registerImage.png';
import calendarImage from 'assets/Landing/calendarImage.png';
import checkImage from 'assets/Landing/checkImage.png';
import filterImage from 'assets/Landing/filtrarImage.png';
import { Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';

const steps = [
  {
    step: '1',
    title: 'REGISTRATE',
    description: 'Creá tu cuenta gratis en menos de un minuto para acceder a todas las canchas disponibles.',
    image: registerImage,
    action: { label: 'Crear Cuenta', to: Routes.REGISTER_USER },
  },
  {
    step: '2',
    title: 'FILTRÁ TU ESPACIO',
    description: 'Buscá complejos por deporte, superficie, ciudad o distancia en el mapa en tiempo real.',
    image: filterImage,
  },
  {
    step: '3',
    title: 'RESERVÁ UN TURNO',
    description: 'Elegí el día, horario y duración ideal para jugar con tus amigos sin intermediarios.',
    image: calendarImage,
  },
  {
    step: '4',
    title: '¡A JUGAR!',
    description: 'Recibí la confirmación al instante y presentate en el complejo listo para darlo todo.',
    image: checkImage,
  },
];

const HowItWorks = () => {
  return (
    <Box id="HowItWorks" component="section" sx={{ py: 10, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: '#FCC931', fontWeight: 800, letterSpacing: 2, fontSize: '0.9rem' }}
          >
            PASO A PASO
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 800, mt: 1, mb: 2, color: '#1E293B' }}
          >
            ¿Cómo funciona?
          </Typography>
          <Box
            sx={{
              height: 4,
              width: 64,
              bgcolor: '#FCC931',
              borderRadius: 2,
              mx: 'auto',
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {steps.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                  bgcolor: '#FFFFFF',
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(226,232,240,0.8)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    bgcolor: 'rgba(252,201,49,0.15)',
                    color: '#E0AC16',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {item.step}
                </Box>

                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{ height: 80, objectFit: 'contain', mx: 'auto', mb: 2 }}
                />

                <CardContent sx={{ flexGrow: 1, p: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: '#1E293B' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </CardContent>

                {item.action && (
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Button
                      component={RouterLink}
                      to={item.action.to}
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 700, px: 2 }}
                    >
                      {item.action.label}
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
