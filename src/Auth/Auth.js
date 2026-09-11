import React, { useEffect, useState, useCallback } from "react";
import { getCurrentUser } from "api/auth";
import { getNotificacionesByUsuarioRealTime } from "api/usuarios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userRoles, setUserRoles] = useState(["default"]);
  const [pending, setPending] = useState(true);
  const [notificaciones, setNotificaciones] = useState([]);

  const syncUser = useCallback(() => {
    const user = getCurrentUser();
    const token = localStorage.getItem('token');
    if (user && token) {
      const normalizedUser = {
        ...user,
        uid: user.id || user.uid,
        email: user.email,
        displayName: user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
        nombre: user.firstName || user.nombre || user.displayName || 'Usuario',
        apellido: user.lastName || user.apellido || '',
        celular: user.phoneNumber || user.celular || '',
        provincia: user.provincia || 'Córdoba',
        ciudad: user.ciudad || 'Córdoba',
      };
      setCurrentUser(normalizedUser);
      setCurrentUserData(normalizedUser);
      setUserRoles([user.role ? user.role.toLowerCase() : "client"]);

      getNotificacionesByUsuarioRealTime(normalizedUser.uid, (data) => {
        setNotificaciones(data || []);
      });
    } else {
      setCurrentUser(null);
      setCurrentUserData(null);
      setUserRoles(["default"]);
      setNotificaciones([]);
    }
    setPending(false);
  }, []);

  useEffect(() => {
    syncUser();

    const handleAuthChange = () => syncUser();
    window.addEventListener('auth-changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [syncUser]);

  if (pending) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "#F8FAFC",
        }}
      >
        <CircularProgress sx={{ color: "#FCC931" }} size={48} />
        <Typography variant="body2" color="text.secondary">
          Cargando Rent Now...
        </Typography>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, userRoles, currentUserData, notificaciones, syncUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

