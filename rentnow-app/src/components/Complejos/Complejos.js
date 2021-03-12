import React, { useState, useEffect } from 'react'
import ComplejosMap from './ComplejosMap/ComplejosMap';
import { getComplejosApi } from 'api/complejosApi'
import { Grid, ButtonGroup, Button } from '@material-ui/core';
import { ComplejosList } from './ComplejosList/ComplejosList';



export const Complejos = () => {
    const [complejos, setComplejos] = useState([])
    const [viewMode, setViewMode] = useState('map')

    useEffect(() => {
        async function fetchComplejos() {
            try {
                const result = await getComplejosApi();
                console.log("resultado", result)
                if (result.status == "OK") {
                    setComplejos(result.data);
                } else {
                    alert(result.message)
                    return;
                }
            } catch (err) {
                alert("se produjo un error");
                return [];
            }
        }
        fetchComplejos();
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                {viewMode === 'map' ? <ComplejosMap complejos={complejos} /> : <ComplejosList complejos={complejos}/>}
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
