import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import moment from "moment";
import React from "react";

const ValoracionListItem = ({ valoracion }) => {
  const { cliente, comentario, fecha, puntaje } = valoracion;

  return (
    <ListItem alignItems="flex-start" divider>
      <ListItemAvatar>
        <Avatar alt={cliente.nombre || ""} src="/static/images/avatar/1.jpg"/>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography>
              {`${cliente.nombre} ${cliente.apellido}`}
              <Rating
                id="puntaje"
                name="puntaje"
                size="small"
                value={puntaje || 0}
              />
            </Typography>
          </>
        }
        secondary={comentario || ""}
      />
      <ListItemText
        style={{ textAlign: 'right' }}
        secondary={fecha ? moment(fecha).format("DD/MM/YY") : "-"}
      />
    </ListItem>
  );
};

export default ValoracionListItem;
