import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
import Swal from 'sweetalert2';
import moment from 'moment';
import { AuthContext } from 'Auth/Auth';
import { createReserva } from 'api/reservas';
import * as Routes from 'constants/routes';
import { tipoEspacio } from 'constants/espacios/constants';

const ConfirmReserva = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reserva = location.state;
  const { currentUser, currentUserData } = useContext(AuthContext);

  const [reservaToSave, setReservaToSave] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!reserva || !currentUser) return;

    const horarioInicio = (reserva.horarioInicio || '00:00').split(':');
    const horarioFin = (reserva.horarioFin || '01:00').split(':');
    const duracionStr = String(reserva.duracion || '1').replace(':', '.').replace('3', '5');
    const numberDuracion = parseFloat(duracionStr) || 1;

    const fechaBase = moment(reserva.fecha, 'DD/MM/YYYY');
    const fechaInicioDate = fechaBase.clone().set({
      hours: parseInt(horarioInicio[0], 10),
      minutes: parseInt(horarioInicio[1], 10),
    });
    const fechaFinDate = fechaBase.clone().set({
      hours: parseInt(horarioFin[0], 10),
      minutes: parseInt(horarioFin[1], 10),
    });

    const precioTotal = (reserva.espacio?.precioTurno || 0) * numberDuracion;

    setReservaToSave({
      cliente: {
        id: currentUser.uid,
        apellido: currentUserData?.apellido || '',
        nombre: currentUserData?.nombre || currentUser.displayName || '',
        email: currentUserData?.email || currentUser.email || '',
        celular: currentUserData?.celular || '',
        cantidadCreadas: currentUserData?.cantidadCreadas || 0,
        cantidadSinConcurrencia: currentUserData?.cantidadSinConcurrencia || 0,
      },
      espacio: {
        id: reserva.espacio?.id,
        descripcion: reserva.espacio?.nombre || '',
        tipoEspacio: reserva.espacio?.tipoEspacio || '',
        foto: reserva.espacio?.foto?.[0] || '',
      },
      complejo: {
        id: reserva.idComplejo,
        foto: reserva.complejo?.fotos?.[0] || '',
        ubicacion: `${reserva.complejo?.ubicacion?.calle || ''} ${reserva.complejo?.ubicacion?.numero || ''}, Barrio: ${reserva.complejo?.ubicacion?.barrio || ''}, ${reserva.complejo?.ubicacion?.ciudad || ''}`,
        nombre: reserva.complejo?.nombre || '',
        tiempoVencimiento: reserva.complejo?.parametrosReserva?.tiempoVencimiento || 12,
      },
      estaPagado: false,
      estados: [],
      monto: precioTotal,
      esFijo: false,
      reservaApp: true,
      fechaInicio: fechaInicioDate.toString(),
      fechaFin: fechaFinDate.toString(),
    });
  }, [currentUser, currentUserData, reserva]);

  if (!reserva) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          No se encontraron datos para confirmar la reserva.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(Routes.COMPLEJOS)}>
          Volver a complejos
        </Button>
      </Container>
    );
  }

  const handleConfirm = async () => {
    if (!reservaToSave) return;
    setIsSubmitting(true);

    try {
      const result = await createReserva(reservaToSave);
      if (result?.status === 'OK' || result?.horarioDisponible === true || result?.data?.horarioDisponible === true) {
        Swal.fire({
          title: '¡Reserva Solicitada!',
          text: 'Tu reserva fue enviada exitosamente. El complejo revisará y confirmará tu turno.',
          icon: 'success',
          confirmButtonText: 'Ver mis reservas',
          allowOutsideClick: false,
        }).then((res) => {
          if (res.isConfirmed) {
            navigate(Routes.CONSULTAR_RESERVAS);
          }
        });
      } else {
        Swal.fire({
          title: 'No se pudo completar la reserva',
          text: result?.message || 'El horario seleccionado ya no se encuentra disponible. Por favor elegí otro.',
          icon: 'error',
          confirmButtonText: 'Entendido',
        }).then(() => {
          navigate(`/complejos/${reserva.idComplejo}`);
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error de conexión',
        text: 'Ocurrió un error al procesar tu reserva. Intentá nuevamente en unos momentos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pitchImage =
    reserva.espacio?.foto?.[0] ||
    tipoEspacio[reserva.espacio?.tipoEspacio]?.urlImagen ||
    'https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=600&auto=format&fit=crop&q=60';

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <ReceiptLongIcon sx={{ fontSize: 44, color: '#FCC931', mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1E293B' }}>
            Confirmá tu Reserva
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Revisá los detalles de tu turno antes de confirmar
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Complejo & Espacio Card */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <Box
            component="img"
            src={pitchImage}
            alt={reserva.espacio?.nombre}
            sx={{
              width: 90,
              height: 90,
              borderRadius: 3,
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ color: '#FCC931', fontWeight: 700, textTransform: 'uppercase' }}>
              {reserva.complejo?.nombre}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E293B' }}>
              {reserva.espacio?.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {reserva.espacio?.tipoEspacio} • {reserva.espacio?.tipoPiso}
            </Typography>
          </Box>
        </Box>

        {/* Details list */}
        <Box sx={{ bgcolor: '#F8FAFC', borderRadius: 3, p: 2.5, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <EventIcon sx={{ color: '#2563EB', fontSize: 22 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                FECHA
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {moment(reserva.fecha, 'DD/MM/YYYY').format('dddd D [de] MMMM YYYY')}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <AccessTimeIcon sx={{ color: '#E0AC16', fontSize: 22 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                HORARIO Y DURACIÓN
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {reserva.horarioInicio} a {reserva.horarioFin} ({reserva.duracion} hs)
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <LocationOnIcon sx={{ color: '#EF4444', fontSize: 22 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                DIRECCIÓN
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {reserva.complejo?.ubicacion?.calle} {reserva.complejo?.ubicacion?.numero},{' '}
                {reserva.complejo?.ubicacion?.ciudad}
              </Typography>
            </Box>
          </Box>

          {reserva.complejo?.telefono && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PhoneIcon sx={{ color: '#10B981', fontSize: 22 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  TELÉFONO COMPLEJO
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {reserva.complejo.telefono}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PaymentsIcon sx={{ color: '#64748B', fontSize: 22 }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                MÉTODO DE PAGO
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Abonás en el complejo al llegar
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Total calculation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E293B' }}>
            Total a pagar:
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#E0AC16' }}>
            ${reservaToSave?.monto || 0}
          </Typography>
        </Box>

        {/* Action Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          onClick={handleConfirm}
          sx={{ py: 1.5, fontWeight: 800, fontSize: '1.05rem', borderRadius: 3 }}
        >
          {isSubmitting ? (
            <CircularProgress size={26} sx={{ color: '#1E293B' }} />
          ) : (
            'Confirmar Reserva'
          )}
        </Button>
      </Paper>
    </Container>
  );
};

export default ConfirmReserva;
