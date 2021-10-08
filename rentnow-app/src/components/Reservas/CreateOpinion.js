import React, { useState, useEffect } from "react";

// Material UI
import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

// Routes
import { useHistory, withRouter } from "react-router-dom";
import * as Routes from "constants/routes";

// Otros
import moment from "moment";
import Swal from "sweetalert2";

import { getReservaById, registerValoracion } from "api/reservas";

const useStyles = makeStyles((theme) => ({
  titulo: {
    textAlign: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  tituloSeccion: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
  },
  complejo: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  paddings: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  boton: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
}));

const CreateOpinion = (props) => {
  const [reserva, setReserva] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { location } = props;
  const { state: locationState } = location;
  const classes = useStyles();

  const [disabled, setDisabled] = useState(true);
  const [puntaje, setPuntaje] = useState(0);
  const [comentario, setComentario] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (locationState.idReserva) {
      getReservaById(locationState.idReserva).then((response) => {
        setReserva(response.data);
        setIsLoading(false);
      });
    }
  }, [locationState.idReserva]);

  const handleChangeRating = (puntaje) => {
    setDisabled(false);
    setPuntaje(puntaje);
  };

  const handleSubmitValoracion = () => {
    setIsLoading(true);
    setDisabled(true);
    registerValoracion({
      puntaje,
      comentario,
      reservaId: reserva.id,
      complejoId: reserva.complejo.id,
      cliente: reserva.cliente,
    })
      .then(() => {
        Swal.fire({
          title: "¡Opinión enviada con éxito!",
          text: "Los demas usuarios de la aplicacion podran ver tu valoracion",
          icon: "success",
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            history.push(Routes.COMPLEJOS);
          }
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Typography className={classes.titulo} variant="h5" gutterBottom>
            Compartí tu opinión
          </Typography>
          <Divider variant="middle" className={classes.divider} />
        </Grid>
        {isLoading ? (
          <Grid item>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {" "}
            <Grid item xs={12} md={6} className={classes.complejo}>
              <img
                src={reserva.complejo.foto}
                alt="imagen-espacio"
                width="100%"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className={classes.tituloSeccion}
                gutterBottom
              >
                <b>{reserva.complejo.nombre}</b>
              </Typography>
              <Typography variant="subtitle2" className={classes.titulo}>
                Espacio: {reserva.espacio.nombre}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                className={classes.titulo}
              >
                {reserva.espacio.tipoEspacio} - {reserva.espacio.tipoPiso} -{" "}
                {reserva.espacio.infraestructura}
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.titulo}
                gutterBottom
              >
                Fecha:
                {moment(reserva.fechaInicio.toDate()).format(
                  "DD/MM/YYYY"
                )} de {moment(reserva.fechaInicio.toDate()).format("HH:mm")} a{" "}
                {moment(reserva.fechaFin.toDate()).format("HH:mm")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" className={classes.divider} />
            </Grid>
            <Grid item xs={12} className={classes.paddings}>
              <Typography variant="subtitle1" gutterBottom>
                Puntaje
              </Typography>
              <Typography variant="caption" display="block">
                Servicio, Calidad y Condiciones del Espacio
              </Typography>
              <Rating
                id="puntaje"
                name="puntaje"
                size="large"
                onChange={(_, newValue) => handleChangeRating(newValue)}
              />
            </Grid>
            <Grid item xs={12} className={classes.paddings}>
              <TextField
                id="comentario"
                name="comentario"
                label="¿Querés agregar un comentario?"
                multiline
                fullWidth
                rowsMax={4}
                defaultValue=""
                value={comentario}
                onChange={(e) => {
                  setComentario(e.currentTarget.value);
                }}
              />
            </Grid>
            <Grid item xs={3} className={classes.boton}>
              <Button
                disabled={disabled ? true : false}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmitValoracion();
                }}
              >
                Enviar
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default withRouter(CreateOpinion);
