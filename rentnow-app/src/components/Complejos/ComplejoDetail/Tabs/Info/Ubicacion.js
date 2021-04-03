import React from 'react'

// MAPA
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '30vh'
};

const Ubicacion = (props) => {

    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_MAP_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={15}
                center={{ lat: props.ubicacion.latlng.latitude, lng: props.ubicacion.latlng.longitude }}
            >
                <Marker key={props.ubicacion.latlng.latitude + props.ubicacion.latlng.longitude} position={{ lat: props.ubicacion.latlng.latitude, lng: props.ubicacion.latlng.longitude }} />
            </GoogleMap>
        </LoadScript>
    )
}

export default Ubicacion
