import apiClient from './client';
import moment from 'moment';

const formatToLocalDateTime = (val) => {
  if (!val) return null;
  const m = moment(val);
  return m.isValid() ? m.format('YYYY-MM-DDTHH:mm:ss') : val;
};

export async function createBookingApi(bookingData) {
  try {
    const rawStart = bookingData.fechaInicio || bookingData.startTime;
    const rawEnd = bookingData.fechaFin || bookingData.endTime;

    const payload = {
      complexId: bookingData.complejo?.id || bookingData.complexId,
      spaceId: bookingData.espacio?.id || bookingData.spaceId,
      clientId: bookingData.cliente?.id || bookingData.clientId,
      clientName: bookingData.cliente?.nombre || bookingData.clientName,
      clientPhone: bookingData.cliente?.celular || bookingData.clientPhone,
      clientEmail: bookingData.cliente?.email || bookingData.clientEmail,
      startTime: formatToLocalDateTime(rawStart),
      endTime: formatToLocalDateTime(rawEnd),
      bookingDate: moment(rawStart || new Date()).format('YYYY-MM-DD'),
      durationHours: bookingData.duracion || 1,
      amount: bookingData.monto,
      isAppBooking: true,
    };


    const data = await apiClient.post('/bookings', payload);
    return {
      status: 'OK',
      message: 'La reserva ha sido creada con éxito.',
      data: {
        horarioDisponible: true,
        reserva: data,
      },
    };
  } catch (err) {
    return {
      status: 'ERROR',
      message: err.message || 'Error al procesar la reserva',
      error: err,
    };
  }
}

export async function getMyBookingsApi() {
  try {
    const data = await apiClient.get('/bookings/my-bookings');
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function getBookingsByClientApi(clientId) {
  try {
    const data = await apiClient.get(`/bookings/client/${clientId}`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function cancelBookingApi(bookingId, reason = 'Cancelado por el usuario') {
  try {
    const data = await apiClient.patch(`/bookings/${bookingId}/status`, {
      status: 'CANCELADA',
      reason,
    });
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

export async function createReviewApi(reviewData) {
  try {
    const payload = {
      complexId: reviewData.complejoId || reviewData.complexId,
      bookingId: reviewData.reservaId || reviewData.bookingId,
      clientId: reviewData.cliente?.id || reviewData.clientId,
      clientName: reviewData.cliente?.nombre ? `${reviewData.cliente.nombre} ${reviewData.cliente.apellido || ''}` : reviewData.clientName,
      score: reviewData.puntaje || reviewData.score || 5,
      comment: reviewData.comentario || reviewData.comment || '',
    };
    const data = await apiClient.post('/reviews', payload);
    return { status: 'OK', message: 'Valoración registrada con éxito', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

export async function getBookingByIdApi(id) {
  try {
    const data = await apiClient.get(`/bookings/${id}`);
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

export async function updateBookingStatusApi(idOrReserva, status = 'CANCELADA', reason = '') {
  try {
    const id = typeof idOrReserva === 'object' ? idOrReserva.id : idOrReserva;
    const finalStatus = typeof idOrReserva === 'object' ? (idOrReserva.estadoActual || 'CANCELADA') : status;
    const finalReason = typeof idOrReserva === 'object' ? (idOrReserva.motivo || 'Cancelado por el usuario') : reason;
    const data = await apiClient.patch(`/bookings/${id}/status`, {
      status: finalStatus,
      reason: finalReason,
    });
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

// Aliases for compatibility with existing components
export const createReserva = createBookingApi;
export const createReservaApp = createBookingApi;
export const getReservaById = getBookingByIdApi;
export const getReservas = getBookingsByClientApi;
export const getReservasByCliente = getBookingsByClientApi;
export const getMyReservas = getMyBookingsApi;
export const cancelReserva = cancelBookingApi;
export const updateReservaState = updateBookingStatusApi;
export const registerValoracion = createReviewApi;
export const registerValoracionToComplejo = createReviewApi;

