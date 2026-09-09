import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AboutImg from 'assets/Landing/logo-amarillo.png';
import { Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';

const AboutUs = () => {
  return (
    <Box id="AboutUs" component="section" sx={{ py: 10, bgcolor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                width: '100%',
                maxHeight: 400,
                borderRadius: 5,
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.06)',
                p: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#1E293B',
              }}
            >
              <Box
                component="img"
                src={AboutImg}
                alt="Rent Now"
                sx={{ maxWidth: '80%', height: 'auto', objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{ color: '#FCC931', fontWeight: 800, letterSpacing: 2, fontSize: '0.9rem' }}
            >
              QUIÉNES SOMOS
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mt: 1, mb: 3, color: '#1E293B' }}>
              Sobre Nosotros
            </Typography>
            <Box sx={{ height: 4, width: 64, bgcolor: '#FCC931', borderRadius: 2, mb: 4 }} />

            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 2, fontSize: '1.05rem' }}>
              Somos <b>Rent Now</b>, un equipo cordobés apasionado por utilizar la tecnología para simplificar la vida de deportistas y dueños de complejos.
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 2, fontSize: '1.05rem' }}>
              ¿Cansado de llamar por teléfono para consultar disponibilidad? ¿Te gustaría conocer nuevas canchas y comparar precios y valoraciones de la comunidad?
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 4, fontSize: '1.05rem' }}>
              Con Rent Now organizás tus turnos en segundos, descubrís promociones exclusivas y reservás de forma transparente y segura.
            </Typography>

            <Button
              component={RouterLink}
              to={Routes.REGISTER_USER}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{ px: 4, py: 1.4, fontWeight: 700, borderRadius: 3 }}
            >
              Creá tu cuenta gratis
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
