import React, { useEffect, useState } from "react";
import { getUserData } from "api/auth";
import { getNotificacionesByUsuarioRealTime } from "api/usuarios";
import firebaseApp from "../firebase";
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

  useEffect(() => {
    const unsubscribeAuth = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setCurrentUserData(null);
        setNotificaciones([]);
      }
      setUserRoles(["default"]);
      setPending(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    let unsubscribeNots;
    getNotificacionesByUsuarioRealTime(currentUser.uid, (data) => {
      setNotificaciones(data || []);
    }).then((unsub) => {
      if (typeof unsub === "function") {
        unsubscribeNots = unsub;
      }
    });

    getUserData(currentUser.uid, (userData) => {
      setCurrentUserData(userData);
      setPending(false);
    }).then(() => {
      setPending(false);
    });

    return () => {
      if (unsubscribeNots) {
        unsubscribeNots();
      }
    };
  }, [currentUser]);

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
      value={{ currentUser, userRoles, currentUserData, notificaciones }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
