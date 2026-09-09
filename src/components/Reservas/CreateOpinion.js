import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import RateReviewIcon from "@mui/icons-material/RateReview";
import moment from "moment";
import Swal from "sweetalert2";

import { getReservaById, registerValoracion } from "api/reservas";
import * as Routes from "constants/routes";

const CreateOpinion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idReserva = location.state?.idReserva;

  const [reserva, setReserva] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [puntaje, setPuntaje] = useState(5);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    if (idReserva) {
      getReservaById(idReserva)
        .then((response) => {
          if (response.status === "OK") {
            setReserva(response.data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [idReserva]);

  const handleSubmitValoracion = async () => {
    if (!reserva) return;
    setIsSubmitting(true);

    try {
      await registerValoracion({
        puntaje,
        comentario,
        reservaId: reserva.id,
        complejoId: reserva.complejo?.id,
        cliente: reserva.cliente,
      });

      Swal.fire({
        title: "¡Opinión enviada!",
        text: "Muchas gracias por tu calificación. Tu opinión ayuda a otros deportistas de la comunidad.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate(Routes.COMPLEJOS);
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo registrar tu opinión. Intentá más tarde.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#FCC931" }} />
      </Box>
    );
  }

  if (!reserva) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          No se encontró la información de la reserva a calificar.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(Routes.CONSULTAR_RESERVAS)}>
          Ver mis reservas
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <RateReviewIcon sx={{ fontSize: 44, color: "#FCC931", mb: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1E293B" }}>
            Compartí tu Experiencia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contanos qué te parecieron las instalaciones y el servicio
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Reserva Summary */}
        <Box sx={{ bgcolor: "#F8FAFC", borderRadius: 3, p: 2.5, mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#1E293B" }}>
            {reserva.complejo?.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cancha: {reserva.espacio?.descripcion || reserva.espacio?.nombre}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Fecha: {reserva.fechaInicio?.toDate
              ? moment(reserva.fechaInicio.toDate()).format("DD/MM/YYYY HH:mm")
              : moment(reserva.fechaInicio).format("DD/MM/YYYY HH:mm")}
          </Typography>
        </Box>

        {/* Rating stars */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#1E293B" }}>
            Puntaje general:
          </Typography>
          <Rating
            name="puntaje"
            size="large"
            value={puntaje}
            onChange={(_, val) => setPuntaje(val || 5)}
            emptyIcon={<StarIcon fontSize="inherit" />}
            sx={{
              color: "#FCC931",
              fontSize: "2.8rem",
            }}
          />
        </Box>

        {/* Commentary input */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Escribí un comentario (opcional)"
          placeholder="¿Cómo estaba la cancha, la iluminación, la atención...?"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          sx={{ mb: 3 }}
        />

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          disabled={isSubmitting}
          onClick={handleSubmitValoracion}
          sx={{ py: 1.4, fontWeight: 800, borderRadius: 2.5 }}
        >
          {isSubmitting ? <CircularProgress size={24} sx={{ color: "#1E293B" }} /> : "Enviar Calificación"}
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateOpinion;
