import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import firebase from 'firebase/compat/app';

import DialogCustom from 'components/utils/DialogCustom/DialogCustom';
import { AuthContext } from 'Auth/Auth';
import { getReservas, updateReservaState } from 'api/reservas';
import { colorsByEstado } from 'constants/reservas/constants';
import { tipoEspacio } from 'constants/espacios/constants';
import * as Routes from 'constants/routes';

function ReservaDetailModal({ open, reserva, onClose }) {
  if (!reserva) return null;
  const estados = reserva.estados || [];
  const lastState = estados[estados.length - 1];

  return (
    <DialogCustom title="Historial del Turno" open={open} onClose={onClose}>
      <Box sx={{ py: 1 }}>
        <Stepper activeStep={estados.length - 1} orientation="vertical">
          {estados.map((item, idx) => {
            const fechaStr = item.fecha?.toDate
              ? moment(item.fecha.toDate()).format('DD/MM/YYYY HH:mm')
              : moment(item.fecha).format('DD/MM/YYYY HH:mm');

            return (
              <Step key={idx} active={true}>
                <StepLabel>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {item.estado}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {fechaStr}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {lastState?.estado === 'CANCELADA' && lastState?.motivo && (
          <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
            <b>Motivo de cancelación:</b> {lastState.motivo}
          </Alert>
        )}
      </Box>
    </DialogCustom>
  );
}

function isCancelable(fechaInicioMoment, estadoActual) {
  const dosHorasAntes = fechaInicioMoment.clone().subtract(2, 'hours');
  const now = moment();
  return (
    dosHorasAntes.isSameOrAfter(now) &&
    estadoActual !== 'CANCELADA' &&
    estadoActual !== 'SIN CONCURRENCIA' &&
    estadoActual !== 'FINALIZADA'
  );
}

function isValorable(reserva) {
  return !reserva.estaValorada && reserva.estadoActual === 'FINALIZADA';
}

const ReservasList = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReservaDetail, setSelectedReservaDetail] = useState(null);

  const fetchReservas = async () => {
    if (!currentUser?.uid) return;
    try {
      const result = await getReservas(currentUser.uid);
      if (result.status === 'OK') {
        setReservas(result.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, [currentUser]);

  const handleCancelReserva = (reserva) => {
    const fechaInicioDate = reserva.fechaInicio?.toDate
      ? reserva.fechaInicio.toDate()
      : new Date(reserva.fechaInicio);

    Swal.fire({
      title: '¿Cancelar esta reserva?',
      text: `Complejo: ${reserva.complejo?.nombre} - Turno: ${moment(fechaInicioDate).format('DD/MM/YYYY HH:mm')}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar turno',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#64748B',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
        const estadosActualizados = [
          ...(reserva.estados || []),
          {
            estado: 'CANCELADA',
            fecha: timestamp,
            motivo: 'La reserva ha sido cancelada por el usuario.',
          },
        ];

        try {
          const resp = await updateReservaState({
            ...reserva,
            estados: estadosActualizados,
            estadoActual: 'CANCELADA',
          });

          if (resp.status === 'OK') {
            Swal.fire({
              title: 'Reserva cancelada',
              text: 'Tu turno ha sido cancelado exitosamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            fetchReservas();
          }
        } catch (e) {
          console.error(e);
          Swal.fire('Error', 'No se pudo cancelar la reserva.', 'error');
          setIsLoading(false);
        }
      }
    });
  };

  const handleGoToValorar = (idReserva) => {
    navigate(Routes.CREATE_OPINION, { state: { idReserva } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1E293B', mb: 1 }}>
          Mis Reservas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Consultá el estado de tus turnos, historial y calificaciones
        </Typography>
      </Box>

      {isLoading ? (
        <Box sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: '#FCC931' }} size={44} />
        </Box>
      ) : reservas.length === 0 ? (
        <Alert
          severity="info"
          sx={{ borderRadius: 3, p: 3, alignItems: 'center' }}
          action={
            <Button
              component={RouterLink}
              to={Routes.COMPLEJOS}
              variant="contained"
              color="primary"
              size="small"
              sx={{ fontWeight: 700 }}
            >
              Explorar Canchas
            </Button>
          }
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ¡Aún no tenés reservas realizadas!
          </Typography>
          <Typography variant="body2">
            Explorá los complejos de tu ciudad y reservá tu primer turno hoy mismo.
          </Typography>
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {reservas.map((reserva) => {
            const fechaInicioDate = reserva.fechaInicio?.toDate
              ? reserva.fechaInicio.toDate()
              : new Date(reserva.fechaInicio);
            const fechaFinDate = reserva.fechaFin?.toDate
              ? reserva.fechaFin.toDate()
              : new Date(reserva.fechaFin);

            const lastEstado =
              reserva.estados && reserva.estados.length > 0
                ? reserva.estados[reserva.estados.length - 1].estado
                : reserva.estadoActual || 'PENDIENTE';

            const badgeBg = colorsByEstado[lastEstado] || '#64748B';

            const pitchImage =
              reserva.espacio?.foto ||
              tipoEspacio[reserva.espacio?.tipoEspacio]?.urlImagen ||
              'https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=600&auto=format&fit=crop&q=60';

            const cancelable = isCancelable(moment(fechaInicioDate), lastEstado);
            const valorable = isValorable(reserva);

            return (
              <Grid item xs={12} sm={6} md={4} key={reserva.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(226,232,240,0.8)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 10px 28px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, textAlign: 'center' }}>
                        {moment(fechaInicioDate).format('DD/MM/YYYY')} • {moment(fechaInicioDate).format('HH:mm')} a {moment(fechaFinDate).format('HH:mm')}
                      </Typography>
                    }
                    sx={{ bgcolor: '#F8FAFC', py: 1.5 }}
                  />

                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={pitchImage}
                      alt={reserva.espacio?.descripcion}
                    />
                    <Chip
                      label={lastEstado}
                      onClick={() => setSelectedReservaDetail(reserva)}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: badgeBg,
                        color: '#FFFFFF',
                        fontWeight: 800,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.9 },
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B', mb: 0.5 }}>
                      {reserva.espacio?.descripcion || 'Cancha'}
                    </Typography>

                    <Typography
                      variant="body2"
                      component={RouterLink}
                      to={`/complejos/${reserva.complejo?.id}`}
                      sx={{
                        display: 'block',
                        color: '#E0AC16',
                        fontWeight: 700,
                        textDecoration: 'none',
                        mb: 1,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {reserva.complejo?.nombre}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}
                    >
                      <LocationOnIcon sx={{ fontSize: 16 }} />
                      {reserva.complejo?.ubicacion}
                    </Typography>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Monto total:
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1E293B' }}>
                        ${reserva.monto}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<InfoOutlinedIcon />}
                      onClick={() => setSelectedReservaDetail(reserva)}
                      sx={{ borderRadius: 2 }}
                    >
                      Ver Estado
                    </Button>

                    {cancelable && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={() => handleCancelReserva(reserva)}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                      >
                        Cancelar Turno
                      </Button>
                    )}

                    {valorable && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<RateReviewIcon />}
                        onClick={() => handleGoToValorar(reserva.id)}
                        sx={{ borderRadius: 2, fontWeight: 800 }}
                      >
                        Calificar Experiencia
                      </Button>
                    )}
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Audit Trail Modal */}
      <ReservaDetailModal
        open={Boolean(selectedReservaDetail)}
        reserva={selectedReservaDetail}
        onClose={() => setSelectedReservaDetail(null)}
      />
    </Container>
  );
};

export default ReservasList;
