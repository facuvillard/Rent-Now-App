import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'Auth/Auth';
import { getComplejosByFilters } from 'api/complejos';
import { getProvincesApi, getCitiesByProvincesApi } from 'api/geoApi';
import DialogCustom from 'components/utils/DialogCustom/DialogCustom';
import { tipoEspacio } from 'constants/espacios/tipoEspacio';
import { useFormik } from 'formik';

function SelectTipoEspacio({ open, tipos, onClose, selectedTipo }) {
  return (
    <DialogCustom title="Filtrar por Deporte o Espacio" open={open} onClose={() => onClose(selectedTipo)}>
      <List sx={{ pt: 0 }}>
        <ListItemButton
          selected={selectedTipo === 'Todos'}
          onClick={() => onClose('Todos')}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemText primary="Todos los deportes" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItemButton>
        {tipos.map((tipo, idx) => (
          <ListItemButton
            key={idx}
            selected={selectedTipo === tipo.value}
            onClick={() => onClose(tipo.value)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText primary={tipo.value} />
          </ListItemButton>
        ))}
      </List>
    </DialogCustom>
  );
}

function SelectCiudad({
  open,
  onClose,
  selectedCiudad,
  selectedProvincia,
  setOpenSelectCiudad,
}) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    getProvincesApi().then((response) => {
      if (response?.provincias) {
        setProvinces(response.provincias);
      }
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      provincia: selectedProvincia || 'Córdoba',
      ciudad: selectedCiudad || 'Córdoba',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onClose(values);
    },
  });

  const handleCitySearch = async (val) => {
    setCityInput(val);
    if (!val || val.length < 3 || !formik.values.provincia) {
      setCities([]);
      return;
    }
    try {
      const resp = await getCitiesByProvincesApi(formik.values.provincia, val);
      if (resp?.localidades) {
        setCities(resp.localidades);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DialogCustom title="Seleccionar Ubicación" open={open} onClose={() => setOpenSelectCiudad(false)}>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ pt: 1 }}>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Provincia"
          name="provincia"
          value={formik.values.provincia}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldValue('ciudad', '');
            setCities([]);
          }}
        >
          {provinces.map((prov) => (
            <MenuItem key={prov.id} value={prov.nombre}>
              {prov.nombre}
            </MenuItem>
          ))}
        </TextField>

        <Autocomplete
          disabled={!formik.values.provincia}
          options={cities}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.nombre || '')}
          value={formik.values.ciudad || null}
          onChange={(_, newValue) => {
            const name = typeof newValue === 'string' ? newValue : newValue?.nombre || '';
            formik.setFieldValue('ciudad', name);
          }}
          inputValue={cityInput}
          onInputChange={(_, value) => handleCitySearch(value)}
          renderInput={(params) => (
            <TextField {...params} margin="normal" label="Ciudad o Localidad" required />
          )}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={() => setOpenSelectCiudad(false)}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
            Aplicar Filtro
          </Button>
        </Box>
      </Box>
    </DialogCustom>
  );
}

export const ComplejosList = () => {
  const { currentUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [complejosList, setComplejosList] = useState([]);
  const [selectedTipoEspacio, setSelectedTipoEspacio] = useState('Todos');
  const [openSelectTipoEspacio, setOpenSelectTipoEspacio] = useState(false);
  const [selectedProvincia, setSelectedProvincia] = useState(
    currentUserData?.provincia || 'Córdoba'
  );
  const [selectedCiudad, setSelectedCiudad] = useState(
    currentUserData?.ciudad || 'Córdoba'
  );
  const [openSelectCiudad, setOpenSelectCiudad] = useState(false);

  useEffect(() => {
    getComplejosByFilters({
      tipoEspacio: selectedTipoEspacio,
      ciudad: selectedCiudad,
      provincia: selectedProvincia,
    }).then((result) => {
      setComplejosList(result.data || []);
    });
  }, [selectedCiudad, selectedProvincia, selectedTipoEspacio]);

  return (
    <Box>
      {/* Filter Bar */}
      <Box
        sx={{
          p: 2.5,
          bgcolor: '#FFFFFF',
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid rgba(226,232,240,0.8)',
          mb: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<SportsSoccerIcon />}
            onClick={() => setOpenSelectTipoEspacio(true)}
            sx={{
              borderRadius: 2.5,
              borderColor: 'rgba(0,0,0,0.15)',
              color: '#1E293B',
              fontWeight: 600,
            }}
          >
            Deporte: <b>{selectedTipoEspacio}</b>
          </Button>

          <Button
            variant="outlined"
            startIcon={<LocationOnIcon />}
            onClick={() => setOpenSelectCiudad(true)}
            sx={{
              borderRadius: 2.5,
              borderColor: 'rgba(0,0,0,0.15)',
              color: '#1E293B',
              fontWeight: 600,
            }}
          >
            Ciudad: <b>{selectedCiudad}</b> ({selectedProvincia})
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {complejosList.length} {complejosList.length === 1 ? 'complejo encontrado' : 'complejos encontrados'}
        </Typography>
      </Box>

      {/* List / Cards */}
      {complejosList.length === 0 ? (
        <Alert severity="warning" sx={{ borderRadius: 3 }}>
          <AlertTitle sx={{ fontWeight: 700 }}>Sin resultados</AlertTitle>
          No encontramos complejos con el filtro de deporte seleccionado en {selectedCiudad},{' '}
          {selectedProvincia}. Probá cambiando la ubicación o seleccionando "Todos".
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {complejosList.map((complejo) => {
            const tiposUnicos = [];
            complejo.espaciosMetaData?.forEach((esp) => {
              if (esp.tipoEspacio && !tiposUnicos.includes(esp.tipoEspacio)) {
                tiposUnicos.push(esp.tipoEspacio);
              }
            });

            const coverPhoto =
              complejo.fotos && complejo.fotos.length > 0
                ? complejo.fotos[0]
                : 'https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=600&auto=format&fit=crop&q=60';

            return (
              <Grid item xs={12} sm={6} md={4} key={complejo.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/complejos/${complejo.id}`)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={coverPhoto}
                        alt={complejo.nombre}
                      />
                      {complejo.valoracionPromedio ? (
                        <Chip
                          icon={<StarIcon sx={{ fontSize: '15px !important', color: '#FCC931' }} />}
                          label={Number(complejo.valoracionPromedio).toFixed(1)}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: 'rgba(30,41,59,0.9)',
                            color: '#FFFFFF',
                            fontWeight: 700,
                            backdropFilter: 'blur(4px)',
                          }}
                        />
                      ) : (
                        <Chip
                          icon={<NewReleasesIcon sx={{ fontSize: '15px !important', color: '#FFFFFF' }} />}
                          label="Nuevo"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: '#10B981',
                            color: '#FFFFFF',
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 800, mb: 1, color: '#1E293B' }}>
                        {complejo.nombre}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}
                      >
                        <LocationOnIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
                        {complejo.ubicacion?.calle} {complejo.ubicacion?.numero},{' '}
                        {complejo.ubicacion?.ciudad}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                        {tiposUnicos.map((tipo) => (
                          <Chip
                            key={tipo}
                            label={tipo}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(252,201,49,0.15)',
                              color: '#B45309',
                              fontWeight: 600,
                              borderRadius: 2,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <SelectTipoEspacio
        open={openSelectTipoEspacio}
        tipos={tipoEspacio}
        selectedTipo={selectedTipoEspacio}
        onClose={(tipo) => {
          setOpenSelectTipoEspacio(false);
          if (tipo) setSelectedTipoEspacio(tipo);
        }}
      />

      <SelectCiudad
        open={openSelectCiudad}
        selectedCiudad={selectedCiudad}
        selectedProvincia={selectedProvincia}
        setOpenSelectCiudad={setOpenSelectCiudad}
        onClose={(res) => {
          setOpenSelectCiudad(false);
          if (res) {
            setSelectedProvincia(res.provincia);
            setSelectedCiudad(res.ciudad);
          }
        }}
      />
    </Box>
  );
};

export default ComplejosList;
