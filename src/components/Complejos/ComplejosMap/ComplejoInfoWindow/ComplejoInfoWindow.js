import React, { useMemo } from 'react';
import { InfoWindow } from '@react-google-maps/api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Link as RouterLink } from 'react-router-dom';
import logo from 'assets/Landing/logo-amarillo-simple.png';

export default function ComplejoInfoWindow({ complejo, setComplejo }) {
  const position = useMemo(() => {
    const lat = Number(complejo?.latitude || complejo?.ubicacion?.latlng?.latitude || complejo?.ubicacion?.lat);
    const lng = Number(
      complejo?.longitude ||
      complejo?.ubicacion?.latlng?.longitude ||
      complejo?.ubicacion?.latlng?.long ||
      complejo?.ubicacion?.lng
    );
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
    return null;
  }, [complejo]);

  if (!position) return null;


  const tiposEspacios = useMemo(() => {
    if (!complejo.espaciosMetaData) return [];
    const set = new Set();
    complejo.espaciosMetaData.forEach((esp) => {
      if (esp.tipoEspacio) set.add(esp.tipoEspacio);
    });
    return Array.from(set);
  }, [complejo]);

  const handleClose = () => {
    setComplejo(null);
  };

  const imageSrc =
    complejo.fotos && complejo.fotos.length > 0
      ? complejo.fotos[0]
      : 'https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=600&auto=format&fit=crop&q=60';

  return (
    <InfoWindow onCloseClick={handleClose} position={position}>
      <Card
        sx={{
          maxWidth: 320,
          borderRadius: 3,
          boxShadow: 'none',
          border: 'none',
          p: 0,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={logo}
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#1E293B',
                p: 0.5,
              }}
            />
          }
          title={
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1E293B' }}>
              {complejo.nombre}
            </Typography>
          }
          subheader={
            complejo.valoracionPromedio ? (
              <Chip
                icon={<StarIcon sx={{ fontSize: '14px !important', color: '#FCC931' }} />}
                label={Number(complejo.valoracionPromedio).toFixed(1)}
                size="small"
                sx={{
                  mt: 0.5,
                  bgcolor: '#1E293B',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  height: 22,
                }}
              />
            ) : (
              <Chip
                icon={<NewReleasesIcon sx={{ fontSize: '14px !important', color: '#FFFFFF' }} />}
                label="Nuevo"
                size="small"
                sx={{
                  mt: 0.5,
                  bgcolor: '#10B981',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  height: 22,
                }}
              />
            )
          }
          sx={{ pb: 1 }}
        />

        <CardMedia
          component="img"
          height="140"
          image={imageSrc}
          alt={complejo.nombre}
          sx={{ borderRadius: 2 }}
        />

        <CardContent sx={{ py: 1.5, px: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.82rem' }}>
            <b>Dirección:</b> {complejo.ubicacion?.calle} {complejo.ubicacion?.numero},{' '}
            {complejo.ubicacion?.barrio ? `${complejo.ubicacion.barrio}, ` : ''}
            {complejo.ubicacion?.ciudad}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tiposEspacios.map((tipo) => (
              <Chip
                key={tipo}
                label={tipo}
                size="small"
                sx={{
                  bgcolor: 'rgba(252,201,49,0.15)',
                  color: '#B45309',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            ))}
          </Box>
        </CardContent>

        <CardActions sx={{ p: 1, pt: 0 }}>
          <Button
            component={RouterLink}
            to={`/complejos/${complejo.id}`}
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            sx={{ fontWeight: 700, borderRadius: 2 }}
          >
            Ver Canchas y Reservar
          </Button>
        </CardActions>
      </Card>
    </InfoWindow>
  );
}
