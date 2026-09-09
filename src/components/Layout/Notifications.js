import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import moment from "moment";
import { AuthContext } from "Auth/Auth";
import { setNotificationAsReaded } from "api/usuarios";
import { useNavigate } from "react-router-dom";
import { getReservaById } from "api/reservas";
import Swal from "sweetalert2";
import * as Routes from "constants/routes";

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { currentUser, notificaciones } = useContext(AuthContext);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotClick = async (not) => {
    if (currentUser?.uid) {
      setNotificationAsReaded(currentUser.uid, not.id);
    }
    handleClose();

    switch (not.tipo) {
      case "RESERVA_FINALIZADA": {
        const result = await getReservaById(not.idReserva);
        if (result?.data?.estaValorada) {
          Swal.fire({
            title: "Esta reserva ya fue valorada",
            text: "Las reservas solo se pueden valorar una vez.",
            icon: "info",
            confirmButtonText: "Aceptar",
          });
          break;
        }
        navigate(Routes.CREATE_OPINION, { state: { idReserva: not.idReserva } });
        break;
      }
      case "RESERVA_CANCELADA":
      case "RESERVA_CONFIRMADA": {
        navigate(Routes.CONSULTAR_RESERVAS);
        break;
      }
      default:
        break;
    }
  };

  const unreadCount = notificaciones?.filter((n) => !n.leida).length || 0;

  if (!currentUser) return null;

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          color: "#FAFAFA",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
        }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          sx: {
            width: 320,
            maxWidth: "90vw",
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "#1E293B", color: "#FFFFFF" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Notificaciones
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {unreadCount > 0 ? `${unreadCount} sin leer` : "Estás al día"}
          </Typography>
        </Box>
        <Divider />
        <List dense sx={{ maxHeight: 360, overflowY: "auto", p: 0 }}>
          {notificaciones && notificaciones.length > 0 ? (
            notificaciones.map((not) => (
              <ListItemButton
                key={not.id}
                onClick={() => handleNotClick(not)}
                selected={!not.leida}
                sx={{
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  py: 1.5,
                  px: 2,
                  backgroundColor: !not.leida ? "rgba(252, 201, 49, 0.08)" : "transparent",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(252, 201, 49, 0.12)",
                  },
                }}
              >
                {!not.leida && (
                  <FiberNewIcon sx={{ color: "#FCC931", mr: 1, fontSize: 22 }} />
                )}
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: !not.leida ? 700 : 500 }}>
                      {not.mensaje}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                      {not.espacio && `${not.espacio} • `}
                      {not.fechaInicio?.toDate
                        ? `${moment(not.fechaInicio.toDate()).format("DD/MM HH:mm")} - ${moment(not.fechaFin?.toDate()).format("HH:mm")}`
                        : ""}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                ¡No tienes notificaciones aún!
              </Typography>
            </Box>
          )}
        </List>
      </Popover>
    </>
  );
};

export default Notifications;
