import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAP_KEY } from 'constants/apiKeys';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const containerStyle = {
  width: '100%',
  height: '320px',
  borderRadius: '16px',
};

const Ubicacion = ({ ubicacion }) => {
  const lat = ubicacion?.latlng?.latitude || -31.4201;
  const lng = ubicacion?.latlng?.longitude || ubicacion?.latlng?.long || -64.1888;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  if (loadError) {
    return <Box sx={{ p: 2, color: 'text.secondary' }}>No se pudo cargar la ubicación en el mapa.</Box>;
  }

  if (!isLoaded) {
    return (
      <Box sx={{ ...containerStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#F1F5F9' }}>
        <CircularProgress sx={{ color: '#FCC931' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        center={{ lat, lng }}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </Box>
  );
};

export default Ubicacion;
