import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import ValoracionListItem from "./ValoracionCard";
import { getValoracionesByComplejoId } from "api/complejos";

const Valoraciones = ({ idComplejo }) => {
  const [valoraciones, setValoraciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getValoracionesByComplejoId(idComplejo)
      .then((result) => {
        setValoraciones(result.data || []);
      })
      .catch((err) => {
        console.error("Error loading reviews", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idComplejo]);

  if (isLoading) {
    return (
      <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#FCC931" }} />
      </Box>
    );
  }

  if (!valoraciones || valoraciones.length === 0) {
    return (
      <Alert severity="info" sx={{ borderRadius: 3 }}>
        <AlertTitle sx={{ fontWeight: 700 }}>Aún no hay opiniones</AlertTitle>
        Sé el primero en reservar y compartir tu experiencia en este complejo.
      </Alert>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        border: "1px solid rgba(226,232,240,0.8)",
      }}
    >
      <List sx={{ p: 0 }}>
        {valoraciones.map((valoracion) => (
          <ValoracionListItem key={valoracion.id} valoracion={valoracion} />
        ))}
      </List>
    </Card>
  );
};

export default Valoraciones;
