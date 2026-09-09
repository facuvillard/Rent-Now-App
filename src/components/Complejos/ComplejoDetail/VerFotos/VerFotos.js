import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { getComplejosById } from 'api/complejos';

const VerFotos = () => {
  const { idComplejo } = useParams();
  const navigate = useNavigate();
  const [complejo, setComplejo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComplejosById(idComplejo).then((response) => {
      if (response.status === 'OK') {
        setComplejo(response.data);
      }
      setIsLoading(false);
    });
  }, [idComplejo]);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#FCC931' }} size={44} />
      </Box>
    );
  }

  const fotos = complejo?.fotos && complejo.fotos.length > 0
    ? complejo.fotos
    : ['https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=1200&auto=format&fit=crop&q=80'];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={() => navigate(`/complejos/${idComplejo}`)}
            sx={{ fontWeight: 700 }}
          >
            Volver al complejo
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          Foto {currentIndex + 1} de {fotos.length}
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#1E293B' }}>
        Fotos de {complejo?.nombre}
      </Typography>

      {/* Main Image Lightbox View */}
      <Paper
        elevation={6}
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: '#0F172A',
          height: { xs: 320, sm: 480, md: 560 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={fotos[currentIndex]}
          alt={`Foto ${currentIndex + 1} de ${complejo?.nombre}`}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'opacity 0.3s ease',
          }}
        />

        {fotos.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              aria-label="Anterior"
              sx={{
                position: 'absolute',
                left: 16,
                bgcolor: 'rgba(255,255,255,0.85)',
                color: '#1E293B',
                '&:hover': { bgcolor: '#FFFFFF' },
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              onClick={handleNext}
              aria-label="Siguiente"
              sx={{
                position: 'absolute',
                right: 16,
                bgcolor: 'rgba(255,255,255,0.85)',
                color: '#1E293B',
                '&:hover': { bgcolor: '#FFFFFF' },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        )}
      </Paper>

      {/* Thumbnails */}
      {fotos.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            py: 1,
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
          }}
        >
          {fotos.map((foto, idx) => (
            <Box
              key={idx}
              component="img"
              src={foto}
              alt={`Miniatura ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              sx={{
                width: 100,
                height: 70,
                objectFit: 'cover',
                borderRadius: 2,
                cursor: 'pointer',
                opacity: idx === currentIndex ? 1 : 0.6,
                border: idx === currentIndex ? '3px solid #FCC931' : '1px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': { opacity: 1 },
              }}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default VerFotos;
