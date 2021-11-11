import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  IconButton,
  Badge,
  Popover,
  List,
  ListItemText,
  ListItem,
  Grid,
  Divider,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FiberNew from "@material-ui/icons/FiberNew";
import moment from "moment";
import { AuthContext } from "Auth/Auth";
import { setNotificationAsReaded } from "api/usuarios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { getReservaById } from "api/reservas";
import Swal from "sweetalert2";
import * as Routes from "constants/routes";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#FAFAFA",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Notifications = () => {
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const openNots = Boolean(notificationsAnchorEl);
  const history = useHistory();
  const classes = useStyles();
  let { currentUser, notificaciones } = useContext(AuthContext);

  const handleOpenNots = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleCloseNots = () => {
    setNotificationsAnchorEl(null);
  };

  const handleNotClick = async (not) => {
    setNotificationAsReaded(currentUser.uid, not.id);
    switch (not.tipo) {
      case "RESERVA_FINALIZADA": {
        const result = await getReservaById(not.idReserva);
        if (result.data.estaValorada) {
          Swal.fire({
            title: "Esta reserva ya fue valorada",
            text: "Encontramos una valoracion para esta reserva, las reservas solo se pueden valorar una vez",
            icon: "info",
            confirmButtonText: "Aceptar",
            allowOutsideClick: true,
          });
          break;
        }
        history.push("/reservas/opinion", { idReserva: not.idReserva });
        break;
      }
      case "RESERVA_CANCELADA":
      case "RESERVA_CONFIRMADA": {
        history.push(Routes.CONSULTAR_RESERVAS);
        break;
      }
      default: {
        return;
      }
    }
  };

  return (
    <>
      {currentUser ? (
        <IconButton onClick={handleOpenNots}>
          <Badge
            color="secondary"
            badgeContent={
              notificaciones.filter((not) => not.leida === false).length
            }
          >
            <NotificationsIcon className={classes.icon} />
          </Badge>
        </IconButton>
      ) : null}

      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openNots}
        onClose={handleCloseNots}
        anchorEl={notificationsAnchorEl}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Typography variant="h6">NOTIFICACIONES</Typography>
        </Grid>
        <Divider className={classes.divider} variant="fullWidth" />
        <List dense={true}>
          {notificaciones && notificaciones.length !== 0 ? (
            notificaciones.map((not, i) => (
              <ListItem
                button
                onClick={() => {
                  handleNotClick(not);
                }}
                selected={not.leida === false ? true : false}
                key={not.id}
              >
                {not.leida === false ? <FiberNew style={{marginRight:'5px'}} color="secondary" /> : null}
                <ListItemText
                  primary={<Typography>{not.mensaje}</Typography>}
                  secondary={`${not.espacio} → ${moment(not.fechaInicio.toDate()).format("DD/MM h:mm")} - ${moment(not.fechaFin.toDate()).format("h:mm")}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={
                  <Typography>¡No tienes notificaciones aún!</Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};

export default Notifications;
