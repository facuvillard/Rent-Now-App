import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MapIcon from '@mui/icons-material/Map';
import ViewListIcon from '@mui/icons-material/ViewList';
import ComplejosMap from './ComplejosMap/ComplejosMap';
import { ComplejosList } from './ComplejosList/ComplejosList';
import { getNearbyComplejos, getComplejosEnabledApi } from 'api/complejos';

export const Complejos = () => {
  const [complejos, setComplejos] = useState([]);
  const [center, setCenter] = useState({
    lat: -31.4201, // Default Córdoba, Argentina
    lng: -64.1888,
  });
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('Geolocation denied or unavailable, using default center', error);
        }
      );
    }
  }, []);

  const handleTabChange = (_, newIndex) => {
    setTabIndex(newIndex);
  };

  async function fetchComplejos(searchCenter) {
    try {
      const result = await getNearbyComplejos([searchCenter.lat, searchCenter.lng], 25000);
      if (result.status === 'OK' && result.data && result.data.length > 0) {
        setComplejos(result.data);
      } else {
        const fallback = await getComplejosEnabledApi();
        if (fallback.status === 'OK') {
          setComplejos(fallback.data || []);
        }
      }
    } catch (err) {
      console.error('Error fetching nearby complejos', err);
      const fallback = await getComplejosEnabledApi();
      if (fallback.status === 'OK') {
        setComplejos(fallback.data || []);
      }
    }
  }

  return (
    <Box sx={{ width: '100%', bgcolor: '#F8FAFC' }}>
      {/* Top Tabs switcher */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#FFFFFF', px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg" disableGutters>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '0.95rem',
                py: 2,
              },
            }}
          >
            <Tab icon={<MapIcon />} iconPosition="start" label="Vista Mapa" />
            <Tab icon={<ViewListIcon />} iconPosition="start" label="Vista Listado" />
          </Tabs>
        </Container>
      </Box>

      {/* Tab Panels */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {tabIndex === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              <AlertTitle sx={{ fontWeight: 700 }}>Explorá el mapa interactivo</AlertTitle>
              Te mostramos los complejos deportivos cercanos a tu ubicación. Podés mover el mapa o hacer clic en los marcadores para ver canchas y reservar.
            </Alert>
            <ComplejosMap center={center} fetchComplejos={fetchComplejos} complejos={complejos} />
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <ComplejosList complejos={complejos} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Complejos;
