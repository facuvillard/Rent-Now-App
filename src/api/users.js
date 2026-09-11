import apiClient from './client';

export async function getUserDataByIdApi(id) {
  try {
    const data = await apiClient.get(`/users/${id}`);
    return { status: 'OK', data };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

export async function createDocForNewUserApi(userData) {
  try {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updated = { ...currentUser, ...userData };
    localStorage.setItem('user', JSON.stringify(updated));
    return { status: 'OK', message: 'Usuario creado con éxito' };
  } catch (err) {
    return { status: 'ERROR', message: err.message, error: err };
  }
}

export const getUserDataById = getUserDataByIdApi;
export const createDocForNewUser = createDocForNewUserApi;

export async function getNotificationsApi(unreadOnly = false) {
  try {
    const data = await apiClient.get(`/notifications?unreadOnly=${unreadOnly}`);
    return { status: 'OK', data: data || [] };
  } catch (err) {
    return { status: 'ERROR', data: [] };
  }
}

export async function markNotificationAsReadApi(id) {
  try {
    await apiClient.patch(`/notifications/${id}/read`);
    return { status: 'OK' };
  } catch (err) {
    return { status: 'ERROR', error: err };
  }
}

export async function getNotificacionesByUsuarioRealTime(userId, callback) {
  try {
    const res = await getNotificationsApi();
    const list = res.data || [];
    if (callback) callback(list);
    return () => {};
  } catch (err) {
    if (callback) callback([]);
    return () => {};
  }
}

export const setNotificationAsReaded = async (userId, notId) => {
  return markNotificationAsReadApi(notId);
};

