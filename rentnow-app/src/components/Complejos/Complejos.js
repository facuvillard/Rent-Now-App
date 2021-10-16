import React, { useState, useEffect } from 'react'
import ComplejosMap from './ComplejosMap/ComplejosMap';
import { getNearbyComplejos } from 'api/complejos'
import {
    Grid, useTheme, Typography, Box, Tab, Tabs, AppBar
} from '@material-ui/core';
import { ComplejosList } from './ComplejosList/ComplejosList';
import SwipeableViews from 'react-swipeable-views';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

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

export const Complejos = (props) => {
    const [complejos, setComplejos] = useState([])
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });
    const [value, setValue] = React.useState(0);
    const theme = useTheme();

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude, lng: position.coords.longitude
                })
            })
        }
    }, [])

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    async function fetchComplejos(center) {
        try {
            const result = await getNearbyComplejos([center.lat, center.lng], 4000);
            if (result.status === "OK") {
                setComplejos(result.data);
            } else {
                alert(result.message)
                return;
            }
        } catch (err) {
            alert("se produjo un error");
            console.log(err)
            return [];
        }
    }

    return (
        <Grid >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Mapa" {...a11yProps(0)} />
                    <Tab label="Listado" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Grid item xs={12}>
                        <ComplejosMap center={center} fetchComplejos={fetchComplejos} complejos={complejos} />
                        <Alert severity="info">
                            <AlertTitle><strong>Nota:</strong> ¡Se mostraran los complejos cercanos a tu ubicación!</AlertTitle>
                            Tambien podrás explorar el mapa y buscar complejos.
                        </Alert>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ComplejosList complejos={complejos} />
                </TabPanel>
            </SwipeableViews>
        </Grid>
    )
}
