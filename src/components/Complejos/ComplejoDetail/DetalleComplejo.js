import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import StarIcon from "@mui/icons-material/Star";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InfoIcon from "@mui/icons-material/Info";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DirectionsIcon from "@mui/icons-material/Directions";

import { getComplejosById } from "api/complejos";
import { getEspaciosByIdComplejo } from "api/espacios";

// Tabs components
import Ubicacion from "./Tabs/Info/Ubicacion";
import Horarios from "./Tabs/Info/Horarios";
import Redes from "./Tabs/Info/Redes";
import ReserveEspacio from "./Tabs/Espacios/ReserveEspacio";
import Valoraciones from "./Tabs/Valoraciones/Valoraciones";

const DetalleComplejo = () => {
  const { idComplejo } = useParams();
  const navigate = useNavigate();
  const [complejo, setComplejo] = useState(null);
  const [espacios, setEspacios] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const compRes = await getComplejosById(idComplejo);
        if (compRes.status === "OK") {
          setComplejo(compRes.data);
          const espRes = await getEspaciosByIdComplejo(idComplejo);
          if (espRes.status === "OK") {
            setEspacios(espRes.data || []);
          }
        }
      } catch (err) {
        console.error("Error loading complex details", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [idComplejo]);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress sx={{ color: "#FCC931" }} size={44} />
      </Box>
    );
  }

  if (!complejo) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Complejo no encontrado
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/complejos")}>
          Volver a Complejos
        </Button>
      </Container>
    );
  }

  const coverPhoto =
    complejo.fotos && complejo.fotos.length > 0
      ? complejo.fotos[0]
      : "https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=1200&auto=format&fit=crop&q=80";

  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${complejo.nombre}, ${complejo.ubicacion?.calle} ${complejo.ubicacion?.numero}, ${complejo.ubicacion?.ciudad}`
  )}`;

  return (
    <Box sx={{ pb: 6 }}>
      {/* Hero Visual Header */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, sm: 380, md: 440 },
          width: "100%",
          backgroundImage: `url(${coverPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.85) 100%)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, pb: { xs: 3, sm: 4 }, color: "#FFFFFF" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, flexWrap: "wrap" }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 900, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                  {complejo.nombre}
                </Typography>
                {complejo.valoracionPromedio ? (
                  <Chip
                    icon={<StarIcon sx={{ fontSize: "16px !important", color: "#FCC931" }} />}
                    label={Number(complejo.valoracionPromedio).toFixed(1)}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.95)",
                      color: "#1E293B",
                      fontWeight: 800,
                      height: 28,
                    }}
                  />
                ) : (
                  <Chip
                    icon={<NewReleasesIcon sx={{ fontSize: "16px !important", color: "#FFFFFF" }} />}
                    label="Nuevo"
                    sx={{
                      bgcolor: "#10B981",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      height: 28,
                    }}
                  />
                )}
              </Box>

              <Typography
                variant="subtitle1"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                <LocationOnIcon sx={{ fontSize: 20, color: "#FCC931" }} />
                {complejo.ubicacion?.calle} {complejo.ubicacion?.numero},{" "}
                {complejo.ubicacion?.barrio ? `${complejo.ubicacion.barrio}, ` : ""}
                {complejo.ubicacion?.ciudad} ({complejo.ubicacion?.provincia})
              </Typography>
            </Box>

            {/* Quick Actions */}
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<PhotoLibraryIcon />}
                onClick={() => navigate(`/complejos/${idComplejo}/ver-fotos`)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.95)",
                  color: "#1E293B",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#FFFFFF" },
                }}
              >
                Ver Fotos ({complejo.fotos?.length || 1})
              </Button>
              <Button
                component="a"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                startIcon={<DirectionsIcon />}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(4px)",
                  "&:hover": { borderColor: "#FCC931", bgcolor: "rgba(252,201,49,0.15)" },
                }}
              >
                Cómo llegar
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#FFFFFF", px: 2 }}>
        <Container maxWidth="lg" disableGutters>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 700,
                fontSize: { xs: "0.85rem", sm: "1rem" },
                py: 2,
              },
            }}
          >
            <Tab icon={<InfoIcon />} iconPosition="start" label="Información" />
            <Tab icon={<SportsSoccerIcon />} iconPosition="start" label={`Canchas (${espacios.length})`} />
            <Tab icon={<RateReviewIcon />} iconPosition="start" label="Opiniones" />
          </Tabs>
        </Container>
      </Box>

      {/* Tab Panels */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {activeTab === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Ubicación */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#1E293B" }}>
                Ubicación
              </Typography>
              <Ubicacion ubicacion={complejo.ubicacion} />
            </Box>

            <Divider />

            {/* Horarios & Redes */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#1E293B" }}>
                  Horarios de Atención
                </Typography>
                <Horarios horarios={complejo.horarios} />
              </Grid>

              <Grid item xs={12} md={5}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#1E293B" }}>
                  Contacto y Redes
                </Typography>
                <Redes redes={complejo.redes} telefono={complejo.telefono} />
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <ReserveEspacio
              espacios={espacios}
              idComplejo={idComplejo}
              complejo={complejo}
            />
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Valoraciones idComplejo={idComplejo} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DetalleComplejo;
