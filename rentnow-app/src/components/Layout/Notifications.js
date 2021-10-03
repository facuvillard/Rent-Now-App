import React, { useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import moment from "moment";
import { AuthContext } from "Auth/Auth";
import { setNotificationAsReaded } from "api/usuarios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#FAFAFA",
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

  const handleCloseNots = (event) => {
    setNotificationsAnchorEl(null);
  };

  const handleNotClick = (not) => {
    setNotificationAsReaded(currentUser.uid, not.id);
    if (not.tipo === "RESERVA_TERMINADA") {
      history.push("/reservas/opinion");
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
        <List dense={true}>
          {notificaciones.map((not, i) => (
            <ListItem
              button
              onClick={() => {
                handleNotClick(not);
              }}
              selected={not.leida === false ? false : true}
            >
              <ListItemText
                primary={<Typography>{not.mensaje}</Typography>}
                secondary={`${not.espacio} → ${moment().format(
                  "DD/MM h:mm"
                )} - ${moment().format("h:mm")}`}
              />
              {not.leida === false ? (
                <PriorityHighIcon color="primary" />
              ) : null}
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default Notifications;
