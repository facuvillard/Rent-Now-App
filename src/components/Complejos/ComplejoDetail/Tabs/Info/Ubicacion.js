import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAP_KEY } from 'constants/apiKeys';
import Box from '@mui/material/Box';

const containerStyle = {
  width: '100%',
  height: '320px',
  borderRadius: '16px',
};

const Ubicacion = ({ ubicacion }) => {
  const lat = ubicacion?.latlng?.latitude || -31.4201;
  const lng = ubicacion?.latlng?.longitude || ubicacion?.latlng?.long || -64.1888;

  return (
    <Box sx={{ width: '100%', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
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
      </LoadScript>
    </Box>
  );
};

export default Ubicacion;
