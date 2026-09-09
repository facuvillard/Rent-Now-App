import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getEspacioById } from 'api/espacios';
import { tipoEspacio } from 'constants/espacios/constants';

const DetalleEspacio = () => {
  const { idEspacio, idComplejo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [espacio, setEspacio] = useState(location.state?.espacio || null);
  const [isLoading, setIsLoading] = useState(!espacio);

  useEffect(() => {
    if (!espacio && idEspacio) {
      getEspacioById(idEspacio)
        .then((result) => {
          if (result.status === 'OK') {
            setEspacio(result.data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idEspacio, espacio]);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#FCC931' }} />
      </Box>
    );
  }

  if (!espacio) {
    return (
      <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6">Cancha no encontrada</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Volver
        </Button>
      </Container>
    );
  }

  const coverPhoto =
    espacio.foto && espacio.foto.length > 0
      ? espacio.foto[0]
      : tipoEspacio[espacio.tipoEspacio]?.urlImagen ||
        'https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=800&auto=format&fit=crop&q=80';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ChevronLeftIcon />}
        onClick={() => navigate(idComplejo ? `/complejos/${idComplejo}` : '/complejos')}
        sx={{ mb: 2, fontWeight: 700 }}
      >
        Volver
      </Button>

      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1px solid rgba(226,232,240,0.8)',
        }}
      >
        <CardMedia
          component="img"
          height="320"
          image={coverPhoto}
          alt={espacio.nombre}
        />

        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1E293B' }}>
              {espacio.nombre}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                icon={<AttachMoneyIcon />}
                label={`$${espacio.precioTurno} / turno`}
                sx={{ bgcolor: 'rgba(252,201,49,0.2)', fontWeight: 700, color: '#B45309' }}
              />
              <Chip
                icon={<PeopleIcon />}
                label={`${espacio.capacidad} participantes`}
                sx={{ bgcolor: 'rgba(59,130,246,0.1)', fontWeight: 700, color: '#2563EB' }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, my: 2 }}>
            <Typography variant="body1">
              <b>Deporte:</b> {espacio.tipoEspacio}
            </Typography>
            <Typography variant="body1">
              <b>Superficie / Piso:</b> {espacio.tipoPiso}
            </Typography>
            <Typography variant="body1">
              <b>Infraestructura:</b> {espacio.infraestructura}
            </Typography>
            {espacio.descripcion && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {espacio.descripcion}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetalleEspacio;
