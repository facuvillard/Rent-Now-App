import apiClient from './client';

export async function getSpacesByComplexApi(complexId) {
  try {
    const data = await apiClient.get(`/spaces/complex/${complexId}`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function getSpaceTypesByComplexApi(complexId) {
  try {
    const data = await apiClient.get(`/spaces/complex/${complexId}/types`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function getAvailableSlotsApi(arg1, arg2, arg3, arg4 = 1) {
  try {
    let complexId, spaceType, rawDate, durationHours;
    if (typeof arg1 === 'string' && (arg1.includes('/') || (arg1.includes('-') && arg1.length === 10 && !arg1.includes('T')))) {
      // Signature: (formattedFecha, selectedTipoEspacio, idComplejo, selectedDuracion)
      rawDate = arg1;
      spaceType = arg2;
      complexId = arg3;
      durationHours = parseInt(arg4, 10) || 1;
    } else {
      // Signature: (complexId, spaceType, date, durationHours)
      complexId = arg1;
      spaceType = arg2;
      rawDate = arg3;
      durationHours = parseInt(arg4, 10) || 1;
    }

    // Convert date to YYYY-MM-DD
    let isoDate = rawDate;
    if (typeof rawDate === 'string' && rawDate.includes('/')) {
      const parts = rawDate.split('/');
      isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    } else if (rawDate instanceof Date) {
      isoDate = rawDate.toISOString().split('T')[0];
    }

    const typeParam = spaceType && spaceType !== 'Todos' ? `&spaceType=${encodeURIComponent(spaceType)}` : '';
    const slots = await apiClient.get(`/spaces/complex/${complexId}/slots?date=${isoDate}&durationHours=${durationHours}${typeParam}`);
    const rawSpaces = await apiClient.get(`/spaces/complex/${complexId}`);

    const normalizedSpaces = (rawSpaces || []).map((s) => ({
      ...s,
      nombre: s.name || s.nombre,
      tipoEspacio: s.spaceType || s.tipoEspacio,
      precioTurno: s.price || s.precioTurno || 5000,
      capacidad: s.capacity || s.capacidad || 10,
      tipoPiso: s.floorType || s.tipoPiso || 'Césped Sintético',
      infraestructura: s.infrastructure || s.infraestructura || 'Techada / Iluminación LED',
      foto: s.photos ? [s.photos] : (s.foto || []),
    }));

    return {
      status: 'OK',
      data: {
        espacios: normalizedSpaces,
        horarios: (slots || []).map((s) => ({
          horaDesde: s.timeFrom,
          horaHasta: s.timeTo,
          espacios: (s.availableSpaceIds || []).map(String),
        })),
      },
    };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: { espacios: [], horarios: [] } };
  }
}


export async function getSpaceByIdApi(id) {
  try {
    const data = await apiClient.get(`/spaces/${id}`);
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

// Aliases for compatibility
export const getEspaciosByComplejo = getSpacesByComplexApi;
export const getEspaciosByIdComplejo = getSpacesByComplexApi;
export const getTiposEspacioByComplejoId = getSpaceTypesByComplexApi;
export const getTiposEspacioByIdComplejo = getSpaceTypesByComplexApi;
export const getFreeHorariosAndEspacios = getAvailableSlotsApi;
export const getHorariosAndEspacios = getAvailableSlotsApi;
export const getEspacioById = getSpaceByIdApi;

