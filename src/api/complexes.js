import apiClient from './client';

export async function getEnabledComplexesApi() {
  try {
    const data = await apiClient.get('/complexes');
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function getNearbyComplexesApi(coords, radius = 25000) {
  try {
    const [lat, lng] = Array.isArray(coords) ? coords : [coords.lat, coords.lng];
    const data = await apiClient.get(`/complexes/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function getComplexByIdApi(id) {
  try {
    const data = await apiClient.get(`/complexes/${id}`);
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

export async function getComplexesByFiltersApi(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.provincia || filters.province) params.append('province', filters.provincia || filters.province);
    if (filters.ciudad || filters.city) params.append('city', filters.ciudad || filters.city);
    const spaceType = filters.tipoEspacio || filters.spaceType;
    if (spaceType && spaceType !== 'Todos') params.append('spaceType', spaceType);

    const data = await apiClient.get(`/complexes?${params.toString()}`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

export async function getComplexReviewsApi(complexId) {
  try {
    const data = await apiClient.get(`/reviews/complex/${complexId}`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err, data: [] };
  }
}

// Aliases for compatibility with existing components
export const getComplejosEnabledApi = getEnabledComplexesApi;
export const getNearbyComplejos = getNearbyComplexesApi;
export const getComplejosById = getComplexByIdApi;
export const getComplejosByFilters = getComplexesByFiltersApi;
export const getValoracionesByComplejoId = getComplexReviewsApi;
export const getComplejoNameImagesAndUbicacion = getComplexByIdApi;
