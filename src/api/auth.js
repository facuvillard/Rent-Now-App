import apiClient from './client';

export async function loginApi(email, password) {
  try {
    const data = await apiClient.post('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      window.dispatchEvent(new Event('auth-changed'));
    }
    return {
      status: 'OK',
      data,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message || 'Error al iniciar sesión',
      error,
    };
  }
}

export async function registerApi(userData) {
  try {
    const payload = {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName || userData.nombre || '',
      lastName: userData.lastName || userData.apellido || '',
      phoneNumber: userData.phoneNumber || userData.celular || '',
      role: userData.role || 'CLIENT',
    };
    const data = await apiClient.post('/auth/register', payload);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      window.dispatchEvent(new Event('auth-changed'));
    }
    return {
      status: 'OK',
      data,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: error.message || 'Error al registrar usuario',
      error,
    };
  }
}

export function logoutApi() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth-changed'));
  return { status: 'OK' };
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export async function getProfileApi() {
  try {
    const data = await apiClient.get('/auth/me');
    return {
      status: 'OK',
      data,
    };
  } catch (error) {
    return {
      status: 'ERROR',
      error,
    };
  }
}

// Aliases for compatibility
export const signIn = loginApi;
export const login = loginApi;
export const signOut = logoutApi;
export const logout = logoutApi;
export const logOut = logoutApi;
export const register = registerApi;
export const signUp = registerApi;
export const signUpWithEmailApi = registerApi;
export const getUser = getCurrentUser;

export const recoverAndResetPassword = async (email) => {
  return { status: 'OK', message: 'Instrucciones enviadas a tu correo.' };
};

export const submitExtraDataOnRegister = async (userId, data) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updated = { ...currentUser, ...data };
    localStorage.setItem('user', JSON.stringify(updated));
    window.dispatchEvent(new Event('auth-changed'));
  }
  return { status: 'OK' };
};

export const getUserData = async (uid, callback) => {
  const user = getCurrentUser();
  if (callback && user) callback(user);
  return user;
};

