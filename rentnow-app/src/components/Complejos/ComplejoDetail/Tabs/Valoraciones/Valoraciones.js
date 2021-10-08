import React, { useState, useEffect } from "react";
import { CircularProgress, Divider, List } from "@material-ui/core";
import ValoracionListItem from "./ValoracionCard";
import { getValoracionesByComplejoId } from "api/complejos";
import Swal from "sweetalert2";
import { Alert, AlertTitle } from "@material-ui/lab";

const Valoraciones = ({ idComplejo }) => {
  const [valoraciones, setValoraciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getValoracionesByComplejoId(idComplejo)
      .then((result) => {
        setValoraciones(result.data);
      })
      .catch(() => {
        Swal.fire({
          title: "¡Error al consultar las valoraciones!",
          text: "Prueba de nuevo mas tarde",
          icon: "error",
          allowOutsideClick: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [idComplejo]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {valoraciones?.length > 0 ? (
        valoraciones.map((valoracion) => (
          <ValoracionListItem key={valoracion.id} valoracion={valoracion} />
        ))
      ) : (
        <Alert severity="info">
          <AlertTitle>
            {" "}
            Este complejo no tiene valoraciones registradas.
          </AlertTitle>
        </Alert>
      )}
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default Valoraciones;
