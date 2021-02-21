import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";



const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const contentStyles = {
    background: `white`,
    border: `1px solid #CCC`,
    padding: 15,
}

const centerOverlayView = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
})


const ComplejosMap = ({complejos}) => {

    return (

        <LoadScript
            googleMapsApiKey={GOOGLE_MAP_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={complejos[0] ? { lat: complejos[0].ubicacion.latlng.latitude, lng: complejos[0].ubicacion.latlng.longitude } : center}
                zoom={12}
            >
                {complejos.map((complejo) => <Marker position={{ lat: complejo.ubicacion.latlng.latitude, lng: complejo.ubicacion.latlng.longitude }}  />)}
            </GoogleMap>
        </LoadScript>

    )
}

//CAMBIAR MARKERS POR LOGO DE RENTNOW.

export default ComplejosMap