import React, { useState, useEffect } from "react";
import ComplejoInfoWindow from "./ComplejoInfoWindow/ComplejoInfoWindow";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Image from "assets/Landing/marker.png";
import User from "assets/Landing/placeholder.png";

const containerStyle = {
  width: "100%",
  height: "72vh",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
};

const ComplejosMap = ({ complejos, center, fetchComplejos }) => {
  const [mapRef, setMapRef] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [selectedComplejo, setSelectedComplejo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  useEffect(() => {
    if (center?.lat && center?.lng) {
      setMapCenter(center);
    }
  }, [center]);

  useEffect(() => {
    if (mapCenter?.lat && mapCenter?.lng && typeof fetchComplejos === "function") {
      setIsLoading(true);
      fetchComplejos(mapCenter).finally(() => {
        setIsLoading(false);
      });
    }
  }, [mapCenter]);

  const handleDragEnd = () => {
    if (!mapRef) return;
    const newCenter = mapRef.getCenter();
    if (newCenter) {
      setMapCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
  };

  if (loadError) {
    return (
      <Alert severity="warning" sx={{ borderRadius: 3, my: 2 }}>
        No se pudo cargar Google Maps. Podés utilizar la pestaña "Vista Listado" para ver todos los complejos.
      </Alert>
    );
  }

  if (!isLoaded) {
    return (
      <Box
        sx={{
          ...containerStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#F1F5F9",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "#FCC931" }} />
        <Box sx={{ color: "#64748B", fontWeight: 600 }}>Cargando mapa interactivo...</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 4 }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={14}
        onLoad={(map) => setMapRef(map)}
        onDragEnd={handleDragEnd}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {/* User Location Marker */}
        {center?.lat && center?.lng && (
          <Marker
            position={{ lat: center.lat, lng: center.lng }}
            icon={User}
            title="Tu ubicación actual"
          />
        )}

        {/* Complejos Markers */}
        {complejos &&
          complejos.map((complejo) => {
            const lat = Number(complejo.latitude || complejo.ubicacion?.latlng?.latitude || complejo.ubicacion?.lat);
            const lng = Number(
              complejo.longitude ||
              complejo.ubicacion?.latlng?.longitude ||
              complejo.ubicacion?.latlng?.long ||
              complejo.ubicacion?.lng
            );

            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

            return (
              <Marker
                key={complejo.id || `${lat}-${lng}`}
                position={{ lat, lng }}
                onClick={() => setSelectedComplejo(complejo)}
                icon={Image}
                title={complejo.nombre}
              />
            );
          })}

        {selectedComplejo && (
          <ComplejoInfoWindow
            complejo={selectedComplejo}
            setComplejo={setSelectedComplejo}
          />
        )}
      </GoogleMap>

      <Backdrop
        open={isLoading}
        sx={{
          position: "absolute",
          zIndex: 10,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.4)",
        }}
      >
        <CircularProgress sx={{ color: "#FCC931" }} />
      </Backdrop>
    </Box>
  );
};

export default ComplejosMap;
