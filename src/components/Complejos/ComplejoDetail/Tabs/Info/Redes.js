import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Redes = ({ redes, telefono }) => {
  const hasSocial =
    Boolean(redes?.facebook) || Boolean(redes?.instagram) || Boolean(redes?.twitter);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid rgba(226,232,240,0.8)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Teléfono */}
        {telefono && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 700 }}>
              TELÉFONO DE CONTACTO
            </Typography>
            <Button
              component="a"
              href={`tel:${telefono}`}
              variant="outlined"
              startIcon={<PhoneIcon sx={{ color: '#10B981' }} />}
              sx={{
                fontWeight: 700,
                color: '#1E293B',
                borderColor: 'rgba(0,0,0,0.12)',
                borderRadius: 2.5,
              }}
            >
              {telefono}
            </Button>
          </Box>
        )}

        {/* Redes */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 700 }}>
          REDES SOCIALES
        </Typography>

        {hasSocial ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {redes.facebook && (
              <Button
                component="a"
                href={redes.facebook.startsWith('http') ? redes.facebook : `https://${redes.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
                sx={{
                  justifyContent: 'flex-start',
                  borderColor: 'rgba(0,0,0,0.1)',
                  color: '#1E293B',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Facebook
              </Button>
            )}

            {redes.instagram && (
              <Button
                component="a"
                href={redes.instagram.startsWith('http') ? redes.instagram : `https://${redes.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<InstagramIcon sx={{ color: '#E4405F' }} />}
                sx={{
                  justifyContent: 'flex-start',
                  borderColor: 'rgba(0,0,0,0.1)',
                  color: '#1E293B',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Instagram
              </Button>
            )}

            {redes.twitter && (
              <Button
                component="a"
                href={redes.twitter.startsWith('http') ? redes.twitter : `https://${redes.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<TwitterIcon sx={{ color: '#1DA1F2' }} />}
                sx={{
                  justifyContent: 'flex-start',
                  borderColor: 'rgba(0,0,0,0.1)',
                  color: '#1E293B',
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Twitter / X
              </Button>
            )}
          </Box>
        ) : (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Este complejo no tiene redes sociales configuradas.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default Redes;
