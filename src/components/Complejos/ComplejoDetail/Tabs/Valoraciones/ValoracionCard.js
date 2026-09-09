import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import moment from "moment";

const ValoracionListItem = ({ valoracion }) => {
  const { cliente, comentario, fecha, puntaje } = valoracion;

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        py: 2,
        px: 2.5,
        borderBottom: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: "#FCC931",
            color: "#1E293B",
            fontWeight: 700,
          }}
        >
          {cliente?.nombre ? cliente.nombre.charAt(0).toUpperCase() : "U"}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1E293B" }}>
              {cliente?.nombre} {cliente?.apellido}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {fecha ? moment(fecha).format("DD/MM/YYYY") : ""}
            </Typography>
          </Box>
        }
        secondary={
          <Box sx={{ mt: 0.5 }}>
            <Rating value={Number(puntaje) || 5} readOnly size="small" sx={{ color: "#FCC931", mb: 0.5 }} />
            {comentario && (
              <Typography variant="body2" color="text.primary" sx={{ fontStyle: "italic", mt: 0.5 }}>
                "{comentario}"
              </Typography>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default ValoracionListItem;
