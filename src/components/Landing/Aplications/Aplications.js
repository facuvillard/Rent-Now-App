import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StorefrontIcon from '@mui/icons-material/Storefront';
import estadisticasImage from 'assets/Landing/estadisticasImage.png';
import deportistaImage from 'assets/Landing/deportistaImage.png';
import { Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';

const Aplications = () => {
  return (
    <Box component="section" sx={{ py: 10, bgcolor: '#F8FAFC' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Para Deportistas */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: { xs: 4, md: 5 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                bgcolor: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                border: '1px solid rgba(226,232,240,0.9)',
              }}
            >
              <Box
                component="img"
                src={deportistaImage}
                alt="Deportistas"
                sx={{ height: 100, objectFit: 'contain', mb: 3 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#1E293B' }}>
                PARA DEPORTISTAS
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7, flexGrow: 1 }}>
                Reservá los mejores espacios deportivos de tu ciudad en un instante, consultá horarios en tiempo real y calificá tu experiencia.
              </Typography>
              <Button
                component={RouterLink}
                to={Routes.REGISTER_USER}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 700, px: 3.5, borderRadius: 3 }}
              >
                Comenzar a Jugar
              </Button>
            </Card>
          </Grid>

          {/* Para Complejos */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: { xs: 4, md: 5 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                bgcolor: '#1E293B',
                color: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}
            >
              <Box
                component="img"
                src={estadisticasImage}
                alt="Administradores de Complejos"
                sx={{ height: 100, objectFit: 'contain', mb: 3 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#FCC931' }}>
                PARA COMPLEJOS
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, lineHeight: 1.7, flexGrow: 1 }}
              >
                Maximizá la ocupación de tus canchas, gestioná reservas automáticamente y evitá turnos sin concurrencia con Rent Now Web.
              </Typography>
              <Button
                component="a"
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.4)',
                  fontWeight: 700,
                  px: 3.5,
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: '#FCC931',
                    bgcolor: 'rgba(252,201,49,0.1)',
                  },
                }}
              >
                Portal Administradores
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Aplications;
