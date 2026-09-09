import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import heroBgImage from 'assets/Landing/bienvenidos-a-rent-now.png';
import { Link as RouterLink } from 'react-router-dom';
import * as Routes from 'constants/routes';

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        color: '#FFFFFF',
      }}
    >
      {/* Background with modern dark gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${heroBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(35%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at center, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2.4rem', sm: '3.6rem', md: '4.2rem' },
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            mb: 2,
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          ¡Bienvenidos a <Box component="span" sx={{ color: '#FCC931' }}>Rent Now</Box>!
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{
            fontWeight: 400,
            fontSize: { xs: '1.1rem', sm: '1.4rem' },
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 680,
            mx: 'auto',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Encontrá, reservá y disfrutá de los mejores espacios deportivos de tu ciudad en simples pasos.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to={Routes.LOGIN}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SportsSoccerIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 800,
              borderRadius: 3,
            }}
          >
            Reservar Ahora
          </Button>

          <Button
            component="a"
            href="#HowItWorks"
            variant="outlined"
            size="large"
            sx={{
              px: 3.5,
              py: 1.5,
              fontSize: '1rem',
              color: '#FFFFFF',
              borderColor: 'rgba(255,255,255,0.4)',
              borderRadius: 3,
              '&:hover': {
                borderColor: '#FCC931',
                backgroundColor: 'rgba(252,201,49,0.1)',
              },
            }}
          >
            Conocé más
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
