import React, { useState, useEffect } from "react";
import ComplejoInfoWindow from "components/Complejos/ComplejosMap/ComplejoInfoWindow/ComplejoInfoWindow";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";
import Image from "assets/Landing/marker.png";
import User from "assets/Landing/placeholder.png";
import { Backdrop, CircularProgress, Tooltip } from "@material-ui/core";

const containerStyle = {
  width: "100%",
  height: "75vh",
};

const ComplejosMap = ({ complejos, center, fetchComplejos }) => {
  const [mapRef, setMapRef] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [selectedComplejo, setSelectedComplejo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let timer;

  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  useEffect(() => {
    fetchComplejos(mapCenter).then(() => {
      setIsLoading(false);
    });
  }, [mapCenter]);

  const handleCenterChange = () => {
    if (!mapRef) {
      return;
    }
    timer = setTimeout(() => {
      setIsLoading(true);
      setMapCenter((oldMapCenter) => {
        if (
          oldMapCenter.lat === mapRef.getCenter().lat() &&
          oldMapCenter.lng === mapRef.getCenter().lng()
        ) {
          return oldMapCenter;
        }
        return {
          lat: mapRef.getCenter().lat(),
          lng: mapRef.getCenter().lng(),
        };
      });
    }, 100);
  };

  return (
    <>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={(map) => setMapRef(map)}
          onDragEnd={handleCenterChange}
          onDragStart={() => clearTimeout(timer)}
        >
          <Tooltip title="Tú estás aquí" arrow>
            <Marker position={{ lat: center.lat, lng: center.lng }} icon={User} />
          </Tooltip>
          <Backdrop open={isLoading} style={{ zIndex: 100 }}>
            <CircularProgress />
          </Backdrop>
          {complejos
            ? complejos.map((complejo) => (
              <Marker
                key={
                  complejo.ubicacion.latlng.latitude +
                  complejo.ubicacion.latlng.long
                }
                position={{
                  lat: complejo.ubicacion.latlng.latitude,
                  lng: complejo.ubicacion.latlng.longitude,
                }}
                onClick={() => {
                  setSelectedComplejo(complejo);
                }}
                icon={Image}
              />
            ))
            : null}
          {selectedComplejo && (
            <ComplejoInfoWindow
              complejo={selectedComplejo}
              setComplejo={setSelectedComplejo}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default ComplejosMap;
