import React, { useState, useEffect } from 'react'
import ComplejosMap from './ComplejosMap/ComplejosMap';
import { getNearbyComplejos } from 'api/complejos'
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import { ComplejosList } from './ComplejosList/ComplejosList';



export const Complejos = () => {
    const [complejos, setComplejos] = useState([])
    const [viewMode, setViewMode] = useState('map')
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    lat: position.coords.latitude, lng: position.coords.longitude
                })
            })
        }
    }, [])


    async function fetchComplejos(center) {
        try {
            const result = await getNearbyComplejos([center.lat,center.lng], 4000);
            if (result.status == "OK") {
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
        <Grid container>
            <Grid item xs={12}>
                {viewMode === 'map' ? <ComplejosMap center={center} fetchComplejos={fetchComplejos} complejos={complejos} /> : <ComplejosList complejos={complejos} />}
            </Grid>
            <Grid>
                <ButtonGroup style={{ position: 'fixed', top: '95%', right: '40%' }} variant="contained" color="primary" aria-label="text primary button group">
                    <Button onClick={() => { setViewMode('map') }}>Mapa</Button>
                    <Button onClick={() => { setViewMode('list') }}>Lista</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}
