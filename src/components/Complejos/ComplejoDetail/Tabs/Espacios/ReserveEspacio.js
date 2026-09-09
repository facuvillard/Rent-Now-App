import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

import DialogCustom from 'components/utils/DialogCustom/DialogCustom';
import { tipoEspacio } from 'constants/espacios/constants';
import { getTiposEspacioByIdComplejo, getHorariosAndEspacios } from 'api/espacios';

function EspacioCard({ espacio, idComplejo, fecha, horarioInicio, horarioFin, complejo, duracion }) {
  const navigate = useNavigate();

  const handleReservar = () => {
    navigate(`/complejos/${idComplejo}/reservas/confirmar`, {
      state: {
        espacio,
        fecha,
        horarioInicio,
        horarioFin,
        complejo,
        idComplejo,
        duracion,
      },
    });
  };

  const imageSrc =
    espacio.foto && espacio.foto.length > 0
      ? espacio.foto[0]
      : tipoEspacio[espacio.tipoEspacio]?.urlImagen ||
        'https://images.unsplash.com/photo-1529900245534-47fbf76681e0?w=600&auto=format&fit=crop&q=60';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid rgba(226,232,240,0.8)',
        transition: 'all 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardHeader
        title={espacio.nombre}
        titleTypographyProps={{ variant: 'h6', fontWeight: 800, align: 'center' }}
        sx={{ bgcolor: '#F8FAFC', py: 1.5 }}
      />
      <CardMedia component="img" height="170" image={imageSrc} alt={espacio.nombre} />
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <Chip
            icon={<AttachMoneyIcon />}
            label={`$${espacio.precioTurno} / turno`}
            sx={{ bgcolor: 'rgba(252,201,49,0.2)', fontWeight: 700, color: '#B45309' }}
          />
          <Chip
            icon={<PeopleIcon />}
            label={`${espacio.capacidad} pers.`}
            sx={{ bgcolor: 'rgba(59,130,246,0.1)', fontWeight: 700, color: '#2563EB' }}
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Deporte:</b> {espacio.tipoEspacio}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <b>Piso:</b> {espacio.tipoPiso}
        </Typography>
        <Typography variant="body2">
          <b>Infraestructura:</b> {espacio.infraestructura}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleReservar}
          sx={{ fontWeight: 800, py: 1.2, borderRadius: 2.5 }}
        >
          Confirmar Reserva
        </Button>
      </CardActions>
    </Card>
  );
}

function SelectTipoEspacioModal({ open, tipos, onClose, selectedTipo }) {
  return (
    <DialogCustom title="Seleccionar Deporte" open={open} onClose={() => onClose(selectedTipo)}>
      <List sx={{ pt: 0 }}>
        {tipos?.map((tipo, idx) => {
          const imgUrl = tipoEspacio[tipo]?.urlImagen;
          return (
            <ListItemButton
              key={idx}
              selected={selectedTipo === tipo}
              onClick={() => onClose(tipo)}
              sx={{ borderRadius: 2, mb: 1 }}
            >
              {imgUrl && (
                <ListItemAvatar>
                  <Avatar src={imgUrl} />
                </ListItemAvatar>
              )}
              <ListItemText primary={tipo} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          );
        })}
      </List>
    </DialogCustom>
  );
}

function SelectDuracionModal({ open, duraciones, onClose, selectedDuracion }) {
  return (
    <DialogCustom title="Duración del Turno" open={open} onClose={() => onClose(selectedDuracion)}>
      <List sx={{ pt: 0 }}>
        {duraciones?.map((dur, idx) => (
          <ListItemButton
            key={idx}
            selected={selectedDuracion === dur}
            onClick={() => onClose(dur)}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemText primary={`${dur} hs`} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ))}
      </List>
    </DialogCustom>
  );
}

const ReserveEspacio = ({ idComplejo, complejo, espacios }) => {
  const [tiposEspacioComplejo, setTiposEspacioComplejo] = useState([]);
  const [selectedTipoEspacio, setSelectedTipoEspacio] = useState(null);
  const [openSelectTipo, setOpenSelectTipo] = useState(false);

  const [selectedDuracion, setSelectedDuracion] = useState('1');
  const [openSelectDuracion, setOpenSelectDuracion] = useState(false);

  const [selectedFecha, setSelectedFecha] = useState(moment().format('YYYY-MM-DD'));
  const [horariosAndEspacios, setHorariosAndEspacios] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [espaciosToShow, setEspaciosToShow] = useState([]);

  const [isLoadingTipos, setIsLoadingTipos] = useState(true);
  const [isLoadingHorarios, setIsLoadingHorarios] = useState(false);

  // Load sport types supported by complex
  useEffect(() => {
    async function loadTipos() {
      try {
        const result = await getTiposEspacioByIdComplejo(idComplejo);
        if (result?.data && result.data.length > 0) {
          setTiposEspacioComplejo(result.data);
          setSelectedTipoEspacio(result.data[0]);
        }
      } catch (e) {
        console.error('Error fetching sport types', e);
      } finally {
        setIsLoadingTipos(false);
      }
    }
    loadTipos();
  }, [idComplejo]);

  // Load available schedules when filters change
  useEffect(() => {
    async function loadHorarios() {
      if (!selectedTipoEspacio || !selectedDuracion || !selectedFecha) return;
      setIsHorariosLoadingSafe(true);
      setSelectedHorario(null);
      setEspaciosToShow([]);

      try {
        const formattedFecha = moment(selectedFecha).format('DD/MM/YYYY');
        const result = await getHorariosAndEspacios(
          formattedFecha,
          selectedTipoEspacio,
          idComplejo,
          selectedDuracion,
          complejo
        );

        if (result.status === 'OK') {
          setHorariosAndEspacios(result.data);
          if (!result.data?.horarios || result.data.horarios.length === 0) {
            Swal.fire({
              title: 'Sin horarios disponibles',
              text: 'No existen turnos libres para los filtros ingresados en esta fecha.',
              icon: 'info',
              confirmButtonText: 'Entendido',
            });
          }
        }
      } catch (err) {
        console.error('Error fetching schedules', err);
      } finally {
        setIsLoadingHorarios(false);
      }
    }

    function setIsHorariosLoadingSafe(v) {
      setIsLoadingHorarios(v);
    }

    loadHorarios();
  }, [selectedTipoEspacio, selectedDuracion, selectedFecha, idComplejo, complejo]);

  const handleHorarioClick = (horario) => {
    if (!horario.espacios || horario.espacios.length === 0) return;
    setSelectedHorario(horario);

    const availablePitches = [];
    horariosAndEspacios?.espacios?.forEach((espacio) => {
      if (horario.espacios.includes(espacio.id)) {
        availablePitches.push(espacio);
      }
    });
    setEspaciosToShow(availablePitches);
  };

  const duracionesOptions = complejo?.parametrosReserva?.duracionTurno || ['1', '1:30', '2'];

  return (
    <Box>
      {/* Selection Filter Bar */}
      <Card
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid rgba(226,232,240,0.8)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, color: '#1E293B' }}>
          Configurá tu Reserva
        </Typography>

        <Grid container spacing={2}>
          {/* Tipo de cancha */}
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SportsFootballIcon />}
              onClick={() => setOpenSelectTipo(true)}
              sx={{
                py: 1.8,
                borderRadius: 2.5,
                borderColor: 'rgba(0,0,0,0.15)',
                color: '#1E293B',
                fontWeight: 700,
                justifyContent: 'flex-start',
                px: 2,
              }}
            >
              Deporte: <Box component="span" sx={{ color: '#B45309', ml: 1 }}>{selectedTipoEspacio || 'Elegir'}</Box>
            </Button>
          </Grid>

          {/* Fecha */}
          <Grid item xs={12} sm={4}>
            <TextField
              type="date"
              fullWidth
              label="Fecha del Turno"
              value={selectedFecha}
              onChange={(e) => setSelectedFecha(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: moment().format('YYYY-MM-DD') }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2.5 } }}
            />
          </Grid>

          {/* Duración */}
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<QueryBuilderIcon />}
              onClick={() => setOpenSelectDuracion(true)}
              sx={{
                py: 1.8,
                borderRadius: 2.5,
                borderColor: 'rgba(0,0,0,0.15)',
                color: '#1E293B',
                fontWeight: 700,
                justifyContent: 'flex-start',
                px: 2,
              }}
            >
              Duración: <Box component="span" sx={{ color: '#2563EB', ml: 1 }}>{selectedDuracion} hs</Box>
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Horarios Carousel / Grid */}
      {isLoadingHorarios ? (
        <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress sx={{ color: '#FCC931' }} />
          <Typography variant="body2" color="text.secondary">
            Consultando disponibilidad de turnos...
          </Typography>
        </Box>
      ) : horariosAndEspacios?.horarios ? (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: '#1E293B' }}>
            Horarios Disponibles para el {moment(selectedFecha).format('dddd D [de] MMMM')}:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              overflowX: 'auto',
              py: 1,
              px: 0.5,
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
            }}
          >
            {horariosAndEspacios.horarios.map((horario, index) => {
              const isAvailable = horario.espacios && horario.espacios.length > 0;
              const isSelected =
                selectedHorario?.horaDesde === horario.horaDesde &&
                selectedHorario?.horaHasta === horario.horaHasta;

              return (
                <Chip
                  key={index}
                  label={`${horario.horaDesde} - ${horario.horaHasta}`}
                  icon={isSelected ? <CheckCircleIcon /> : undefined}
                  onClick={() => isAvailable && handleHorarioClick(horario)}
                  sx={{
                    px: 1.5,
                    py: 2.5,
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    bgcolor: isSelected
                      ? '#FCC931'
                      : isAvailable
                      ? 'rgba(16,185,129,0.12)'
                      : 'rgba(148,163,184,0.18)',
                    color: isSelected
                      ? '#1E293B'
                      : isAvailable
                      ? '#059669'
                      : '#94A3B8',
                    border: isSelected ? '2px solid #E0AC16' : '1px solid transparent',
                    '&:hover': isAvailable
                      ? {
                          bgcolor: isSelected ? '#FDE06D' : 'rgba(16,185,129,0.22)',
                        }
                      : {},
                  }}
                />
              );
            })}
          </Box>
        </Box>
      ) : null}

      {/* Available Pitches */}
      {espaciosToShow.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#1E293B' }}>
            Canchas Disponibles ({selectedHorario?.horaDesde} a {selectedHorario?.horaHasta}):
          </Typography>

          <Grid container spacing={3}>
            {espaciosToShow.map((espacio) => (
              <Grid item xs={12} sm={6} md={4} key={espacio.id}>
                <EspacioCard
                  complejo={complejo}
                  espacio={espacio}
                  idComplejo={idComplejo}
                  fecha={moment(selectedFecha).format('DD/MM/YYYY')}
                  horarioInicio={selectedHorario?.horaDesde}
                  horarioFin={selectedHorario?.horaHasta}
                  duracion={selectedDuracion}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        !isLoadingHorarios && (
          <Alert severity="info" sx={{ borderRadius: 3, mt: 3 }}>
            Seleccioná un horario disponible de la barra superior para ver las canchas que podés reservar.
          </Alert>
        )
      )}

      {/* Modals */}
      <SelectTipoEspacioModal
        open={openSelectTipo}
        tipos={tiposEspacioComplejo}
        selectedTipo={selectedTipoEspacio}
        onClose={(val) => {
          setOpenSelectTipo(false);
          if (val) setSelectedTipoEspacio(val);
        }}
      />

      <SelectDuracionModal
        open={openSelectDuracion}
        duraciones={duracionesOptions}
        selectedDuracion={selectedDuracion}
        onClose={(val) => {
          setOpenSelectDuracion(false);
          if (val) setSelectedDuracion(val);
        }}
      />
    </Box>
  );
};

export default ReserveEspacio;
