import React, { useState, useEffect } from "react";
import ComplejoInfoWindow from "./ComplejoInfoWindow/ComplejoInfoWindow";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
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

  useEffect(() => {
    if (center?.lat && center?.lng) {
      setMapCenter(center);
    }
  }, [center]);

  useEffect(() => {
    if (mapCenter?.lat && mapCenter?.lng && typeof fetchComplejos === "function") {
      fetchComplejos(mapCenter).finally(() => {
        setIsLoading(false);
      });
    }
  }, [mapCenter]);

  const handleDragEnd = () => {
    if (!mapRef) return;
    const newCenter = mapRef.getCenter();
    if (newCenter) {
      setIsLoading(true);
      setMapCenter({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 4 }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
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
            <Tooltip title="Tu ubicación actual" arrow>
              <Marker position={{ lat: center.lat, lng: center.lng }} icon={User} />
            </Tooltip>
          )}

          {/* Complejos Markers */}
          {complejos &&
            complejos.map((complejo) => {
              const lat = complejo.ubicacion?.latlng?.latitude;
              const lng =
                complejo.ubicacion?.latlng?.longitude ||
                complejo.ubicacion?.latlng?.long;

              if (!lat || !lng) return null;

              return (
                <Marker
                  key={complejo.id || `${lat}-${lng}`}
                  position={{ lat, lng }}
                  onClick={() => setSelectedComplejo(complejo)}
                  icon={Image}
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
      </LoadScript>

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
