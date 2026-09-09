import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import argentinaImage from 'assets/Landing/argentina-logo.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0F172A',
        color: '#94A3B8',
        py: 6,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {/* Brand & Rights */}
          <Box>
            <Typography variant="h6" sx={{ color: '#FAFAFA', fontWeight: 800 }}>
              Rent Now <Box component="span" sx={{ color: '#FCC931' }}>App</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
              © {new Date().getFullYear()} Rent Now. Todos los derechos reservados.
            </Typography>
          </Box>

          {/* Social Icons & Country */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{ color: '#94A3B8', '&:hover': { color: '#FCC931' } }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{ color: '#94A3B8', '&:hover': { color: '#FCC931' } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              sx={{ color: '#94A3B8', '&:hover': { color: '#FCC931' } }}
            >
              <TwitterIcon />
            </IconButton>

            <Box
              component="img"
              src={argentinaImage}
              alt="Argentina"
              sx={{ height: 28, width: 28, objectFit: 'contain', ml: 1 }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
