import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Fab,
  Typography,
  Link,
  Button,
  Container,
  Divider,
  GridList,
  GridListTile,
  GridListTileBar,
  Box,
  Tab,
  Tabs,
  AppBar,
  Chip,
} from "@material-ui/core";

// APIS
import { getComplejosById } from "api/complejos";
import { getEspaciosByIdComplejo } from "api/espacios";

//Iconos
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// Componentes Genericos
import LinkCustom from "components/utils/LinkCustom/LinkCustom";

// TABS
// Info
import Ubicacion from "components/Complejos/ComplejoDetail/Tabs/Info/Ubicacion";
import Horarios from "components/Complejos/ComplejoDetail/Tabs/Info/Horarios";
import Redes from "components/Complejos/ComplejoDetail/Tabs/Info/Redes";
// Espacios
import ReserveEspacio from "components/Complejos/ComplejoDetail/Tabs/Espacios/ReserveEspacio";
// Valoraciones
import Valoraciones from "components/Complejos/ComplejoDetail/Tabs/Valoraciones/Valoraciones";
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
  },
  title: {
    color: "#FAFAFA",
  },
  subtitle: {
    color: "#FAFAFA",
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  tituloSeccion: {
    textAlign: "center",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  verticalDivider: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fab: {
    position: "fixed",
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  chip: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  loading: {
    marginTop: theme.spacing(4),
  },
  chipValoracion: {
		margin: 'auto',
		marginLeft: theme.spacing(2),
	},
  chipSuccess: {
		backgroundColor: '#66bb6a',
		color: '#FAFAFA',
		margin: 'auto',
		marginLeft: theme.spacing(2),
	},
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const DetalleComplejo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [complejo, setComplejo] = useState({});
  const [espacios, setEspacios] = useState({});
  const [value, setValue] = React.useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const { idComplejo } = useParams();

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    getComplejosById(idComplejo).then((response) => {
      if (response.status === "OK") {
        setComplejo(response.data);
        getEspaciosByIdComplejo(idComplejo).then((response) => {
          if (response.status === "OK") {
            setEspacios(response.data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [idComplejo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      {isLoading ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.loading}
        >
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          <div className={classes.root}>
            <GridList
              cols={1}
              rows={1}
              cellHeight={400}
              className={classes.gridList}
            >
              <GridListTile>
                <LinkCustom to={`/complejos/${idComplejo}/ver-fotos`}>
                  <img
                    src={complejo.fotos[0]}
                    alt={complejo.nombre}
                    width="100%"
                    height="100%"
                  />
                </LinkCustom>
                <GridListTileBar
                  style={
                    !matches
                      ? { display: "flex", height: "30%" }
                      : { display: "flex", height: "20%" }
                  }
                  title={
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography component="h5" variant="h5">
                        {complejo.nombre}
                      </Typography>
                      {complejo.valoracionPromedio ? (
													<Chip
														icon={<StarBorderIcon />}
														label={complejo.valoracionPromedio.toFixed(2)}
														color="primary"
														size='small'
														className={classes.chipValoracion}
													/>
												) : (
													<Chip
														icon={<NewReleasesIcon style={{ color: '#FAFAFA' }} />}
														label={'Nuevo'}
														size='small'
														className={classes.chipSuccess}
													/>
												)}
                    </Grid>
                  }
                  subtitle={
                    <Link
                      href={`https://maps.google.com/?ll=${complejo.ubicacion.latlng.latitude},${complejo.ubicacion.latlng.longitude}`}
                      target="_blank"
                      color="inherit"
                    >
                      <Typography variant="subtitle1">
                        {complejo.ubicacion.calle}, {complejo.ubicacion.numero}{" "}
                        {complejo.ubicacion.ciudad}{" "}
                        {complejo.ubicacion.provincia}
                      </Typography>
                    </Link>
                  }
                  classes={{
                    title: classes.title,
                    subtitle: classes.subtitle,
                  }}
                  actionIcon={
                    <LinkCustom to={`/complejos/${idComplejo}/ver-fotos`}>
                      <Button className={classes.title}>Ver Fotos</Button>
                    </LinkCustom>
                  }
                />
              </GridListTile>
            </GridList>
          </div>
          <section>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Info" {...a11yProps(0)} />
                <Tab label="Espacios" {...a11yProps(1)} />
                <Tab label="Valoraciones" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Typography
                  className={classes.tituloSeccion}
                  variant="h4"
                  gutterBottom
                >
                  Ubicación
                </Typography>
                <Ubicacion ubicacion={complejo.ubicacion} />
                <Divider className={classes.divider} />
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  spacing={5}
                >
                  <Grid item xs={12} md={5}>
                    <Typography
                      className={classes.tituloSeccion}
                      variant="h4"
                      gutterBottom
                    >
                      Horarios
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.tituloSeccion}
                    >
                      Aquí encontrarás todos los horarios de atención del
                      complejo
                    </Typography>
                    <Horarios horarios={complejo.horarios} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={1}
                    className={
                      matches ? classes.verticalDivider : classes.divider
                    }
                  >
                    <Divider
                      orientation={matches ? "vertical" : "horizontal"}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Typography
                      className={classes.tituloSeccion}
                      variant="h4"
                      gutterBottom
                    >
                      Redes
                    </Typography>
                    <Typography
                      color="textSecondary"
                      className={classes.tituloSeccion}
                    >
                      Aquí encontrarás las redes sociales que tenga el complejo.
                    </Typography>
                    <Redes redes={complejo.redes} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <Container className={classes.cardGrid} maxWidth="md">
                  <ReserveEspacio
                    espacios={espacios}
                    idComplejo={idComplejo}
                    complejo={complejo}
                  />
                </Container>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <Grid item xs={12} md={12}>
                  <Typography
                    className={classes.tituloSeccion}
                    variant="h4"
                    gutterBottom
                  >
                    Valoraciones
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.tituloSeccion}
                  >
                    Aquí encontrarás todas las valoraciones y opiniones
                    realizadas por los usuarios sobre el complejo y sus espacios
                  </Typography>
                  <Valoraciones idComplejo={idComplejo} />
                </Grid>
              </TabPanel>
            </SwipeableViews>
          </section>

          <Fab
            size="small"
            aria-label="Volver"
            className={classes.fab}
            color="inherit"
          >
            <ArrowBackIosRoundedIcon />
          </Fab>
        </>
      )}
    </>
  );
};

export default DetalleComplejo;
